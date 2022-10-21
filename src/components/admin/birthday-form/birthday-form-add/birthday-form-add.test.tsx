import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BirthdayService from '../../../../common/services/birthday.service';
import UserService from '../../../../common/services/user.service';
import { getAllByTagName, getByClass } from '../../../../setupTests';
import BirthdayFormAdd from './birthday-form-add.component';

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

        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
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

        expect(BirthdayService.getBirthdaysLight).not.toHaveBeenCalled();
    });

    it('component submit UserService.getUserLight failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
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

        expect(BirthdayService.getBirthdaysLight).not.toHaveBeenCalled();

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });

    it('component submit BirthdayService.getBirthdaysLight failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );
        BirthdayService.createBirthday = jest.fn().mockImplementation(
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

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(BirthdayService.getBirthdaysLight).toBeCalledTimes(1);
        expect(BirthdayService.getBirthdaysLight).toBeCalledWith({
            filter: {
                date: {
                    eq: '1994-02-01'
                }
            }
        });
        expect(UserService.udpateUser).not.toHaveBeenCalled();
        expect(BirthdayService.createBirthday).not.toHaveBeenCalled();

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
        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'b-1'
                }];
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );
        BirthdayService.createBirthday = jest.fn().mockImplementation(
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

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.getBirthdaysLight).toBeCalledTimes(1);
            expect(BirthdayService.getBirthdaysLight).toBeCalledWith({
                filter: {
                    date: {
                        eq: '1994-02-01'
                    }
                }
            });

            await waitFor(() => {
                expect(UserService.udpateUser).toHaveBeenCalled();
                expect(BirthdayService.createBirthday).not.toHaveBeenCalled();
            });
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });

    it('component submit with existing date', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'b-1'
                }];
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {}
        );
        BirthdayService.createBirthday = jest.fn().mockImplementation(
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

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.getBirthdaysLight).toBeCalledTimes(1);
            expect(BirthdayService.getBirthdaysLight).toBeCalledWith({
                filter: {
                    date: {
                        eq: '1994-02-01'
                    }
                }
            });

            await waitFor(async () => {
                expect(UserService.udpateUser).toHaveBeenCalled();
                expect(UserService.udpateUser).toBeCalledWith({
                    input: {
                        id: 'id-1', 
                        birthdayUsersId: 'b-1'
                    }
                });
                expect(BirthdayService.createBirthday).not.toHaveBeenCalled();
            });
        });

        const success = screen.getByText(/admin.birthdays.success/i);
        expect(success).not.toHaveClass('hidden');
    });

    it('component submit with existing date BirthdayService.createBirthday failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );
        BirthdayService.createBirthday = jest.fn().mockImplementation(
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

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.getBirthdaysLight).toBeCalledTimes(1);
            expect(BirthdayService.getBirthdaysLight).toBeCalledWith({
                filter: {
                    date: {
                        eq: '1994-02-01'
                    }
                }
            });

            await waitFor(() => {
                expect(BirthdayService.createBirthday).toHaveBeenCalled();
                expect(UserService.udpateUser).not.toHaveBeenCalled();
            });
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });

    it('component submit without existing date', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {}
        );
        BirthdayService.createBirthday = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'b-1'
                };
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

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.getBirthdaysLight).toBeCalledTimes(1);
            expect(BirthdayService.getBirthdaysLight).toBeCalledWith({
                filter: {
                    date: {
                        eq: '1994-02-01'
                    }
                }
            });

            await waitFor(async () => {
                expect(BirthdayService.createBirthday).toHaveBeenCalled();
                expect(BirthdayService.createBirthday).toHaveBeenCalledWith({
                    input: {
                        date: '1994-02-01'
                    }
                });

                 await waitFor(async () => {
                    expect(UserService.udpateUser).toHaveBeenCalled();
                    expect(UserService.udpateUser).toBeCalledWith({
                        input: {
                            id: 'id-1', 
                            birthdayUsersId: 'b-1'
                        }
                    });
                });
            });
        });

        const success = screen.getByText(/admin.birthdays.success/i);
        expect(success).not.toHaveClass('hidden');
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
        BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    ids: 'b-1'
                }];
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {}
        );
        BirthdayService.createBirthday = jest.fn().mockImplementation(
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

        const button = screen.getByText(/admin.birthdays.save/i);

        await waitFor(async () => {
            fireEvent.click(button);

            expect(BirthdayService.getBirthdaysLight).toBeCalledTimes(1);
            expect(BirthdayService.getBirthdaysLight).toBeCalledWith({
                filter: {
                    date: {
                        eq: '1994-02-01'
                    }
                }
            });

            await new Promise(r => setTimeout(r, 0));
            expect(UserService.udpateUser).not.toHaveBeenCalled();
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.birthdays.error");
    });
});
