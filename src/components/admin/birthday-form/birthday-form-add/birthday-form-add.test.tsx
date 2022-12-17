import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BirthdayService from '../../../../common/services/birthday.service';
import UserService from '../../../../common/services/user.service';
import { getAllByTagName, getByClass } from '../../../../setupTests';
import BirthdayFormAdd from './birthday-form-add.component';
/*
describe('render birthday form add', () => {
    it('component default', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <BirthdayFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toHaveBeenCalledTimes(1);

        const mainDiv = getByClass('form-birthday-add', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv.tagName).toEqual('FORM');

        const selectWho = screen.getByText(/admin.birthdays.who/i);
        expect(selectWho).toBeInTheDocument();

        const selectDay = screen.getByText(/inputs.day/i);
        expect(selectDay).toBeInTheDocument();

        const selectMonth = screen.getByText(/inputs.month/i);
        expect(selectMonth).toBeInTheDocument();

        const selectYear = screen.getByText(/inputs.year/i);
        expect(selectYear).toBeInTheDocument();

        const button = screen.getByText(/admin.birthdays.save/i);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toEqual('BUTTON');

        const success = screen.getByText(/admin.birthdays.success/i);
        expect(success).toBeInTheDocument();
        expect(success.tagName).toEqual('DIV');
        expect(success).toHaveClass('toaster', 'hidden', 'success');
    });

    it('component submit but empty', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );

        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {}
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <BirthdayFormAdd />
                </BrowserRouter>
            );
        });

        const button = screen.getByText(/admin.birthdays.save/i);
        fireEvent.click(button);

        expect(BirthdayService.assertBirthdayId).not.toHaveBeenCalled();
    });

    it('component submit UserService.getUserLight failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {}
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <BirthdayFormAdd />
                </BrowserRouter>
            );
        });

        const button = screen.getByText(/admin.birthdays.save/i);
        fireEvent.click(button);

        expect(BirthdayService.assertBirthdayId).not.toHaveBeenCalled();

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });

    it('component submit with existing date UserService.udpateUser failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                return 'id-1';
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <BirthdayFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toHaveBeenCalledTimes(1);

        setSelectValues();

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.assertBirthdayId).toBeCalledTimes(1);
            expect(BirthdayService.assertBirthdayId).toBeCalledWith('1994-02-01');

            await waitFor(() => {
                expect(UserService.udpateUser).toHaveBeenCalled();
            });
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });

    it('component submit with existing date BirthdayService.assertBirthdayId failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <BirthdayFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toHaveBeenCalledTimes(1);

        setSelectValues();

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.assertBirthdayId).toBeCalledTimes(1);
            expect(BirthdayService.assertBirthdayId).toBeCalledWith('1994-02-01');

            expect(UserService.udpateUser).not.toHaveBeenCalled();
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });

    it('component submit with existing date but no id', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                return 'b-1';
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {}
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <BirthdayFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toHaveBeenCalledTimes(1);

        setSelectValues();

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.assertBirthdayId).toBeCalledTimes(1);
            expect(BirthdayService.assertBirthdayId).toBeCalledWith('1994-02-01');

            await new Promise(r => setTimeout(r, 0));
            await waitFor(async () => {
                expect(UserService.udpateUser).toBeCalledTimes(1);
                expect(UserService.udpateUser).toBeCalledWith({
                    input: {
                        id: 'id-1',
                        birthdayUsersId: 'b-1'
                    }
                });
            });
        });

        const success = screen.getByText(/admin.birthdays.success/i);
        expect(success).not.toHaveClass('hidden');
   });

    function setSelectValues() {
        const selects = getAllByTagName('select', screen);

        fireEvent.change(selects[1], {
            target: {
                value: '1'
            }
        });

        fireEvent.change(selects[2], {
            target: {
                value: '2'
            }
        });

        fireEvent.change(selects[3], {
            target: {
                value: '1994'
            }
        });

        fireEvent.change(selects[0], {
            target: {
                value: 'id-1'
            }
        });
    }
});
 */
