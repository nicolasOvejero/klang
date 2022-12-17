import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewArrivalsService from '../../../../common/services/new-arrivals.service';
import UserService from '../../../../common/services/user.service';
import { getAllByTagName, getByClass } from '../../../../setupTests';
import NewArrivalFormAdd from './new-arrival-form-add.component';

/* describe('render new arrivals form add', () => {
    it('component default', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toHaveBeenCalledTimes(1);

        const mainDiv = getByClass('form-newarrivals-add', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv.tagName).toEqual('FORM');

        const selectWho = screen.getByText(/admin.new-arrivals.who/i);
        expect(selectWho).toBeInTheDocument();

        const selectDay = screen.getByText(/inputs.day/i);
        expect(selectDay).toBeInTheDocument();

        const selectMonth = screen.getByText(/inputs.month/i);
        expect(selectMonth).toBeInTheDocument();

        const selectYear = screen.getByText(/inputs.year/i);
        expect(selectYear).toBeInTheDocument();

        const button = screen.getByText(/admin.new-arrivals.save/i);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toEqual('BUTTON');

        const success = screen.getByText(/admin.new-arrivals.success/i);
        expect(success).toBeInTheDocument();
        expect(success.tagName).toEqual('DIV');
        expect(success).toHaveClass('toaster', 'hidden', 'success');
    });

    it('component submit UserService.getUserLight failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toBeCalledWith({
            filter: {
                newArrivalsUsersId: {
                    attributeExists: false
                }
            }
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.new-arrivals.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.new-arrivals.error");
    });

    it('component submit but empty', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );

        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        const button = screen.getByText(/admin.new-arrivals.save/i);
        fireEvent.click(button);

        expect(UserService.udpateUser).not.toHaveBeenCalled();
    });

    it('component submit NewArrivalsService.getNewArrivals failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    firstname: 'Test',
                    lastname: 'TEST',
                    id: 'u-1',
                }];
            }
        );

        NewArrivalsService.getNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toBeCalledWith({
            filter: {
                newArrivalsUsersId: {
                    attributeExists: false
                }
            }
        });

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
                value: '2022'
            }
        });

        fireEvent.change(selects[0], {
            target: {
                value: 'u-1'
            }
        });

        const button = screen.getByText(/admin.new-arrivals.save/i);

        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledTimes(1);
        expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledWith({
            filter: {
                date: {
                    eq: '2022-02-01'
                }
            }
        });
        expect(UserService.udpateUser).not.toHaveBeenCalled();

        await new Promise(r => setTimeout(r, 0));

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.new-arrivals.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.new-arrivals.error");
    });

    it('component submit NewArrivalsService.createNewArrivals failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    firstname: 'Test',
                    lastname: 'TEST',
                    id: 'u-1',
                }];
            }
        );

        NewArrivalsService.getNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        NewArrivalsService.createNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toBeCalledWith({
            filter: {
                newArrivalsUsersId: {
                    attributeExists: false
                }
            }
        });

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
                value: '2022'
            }
        });

        fireEvent.change(selects[0], {
            target: {
                value: 'u-1'
            }
        });

        const button = screen.getByText(/admin.new-arrivals.save/i);

        await waitFor(async () => {
            fireEvent.click(button);
            await waitFor(() => {
                expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledTimes(1);
                expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledWith({
                    filter: {
                        date: {
                            eq: '2022-02-01'
                        }
                    }
                });
            });
        });

        expect(NewArrivalsService.createNewArrivals).toHaveBeenCalledTimes(1);
        expect(NewArrivalsService.createNewArrivals).toHaveBeenCalledWith({
            input: {
                date: '2022-02-01'
            }
        });
        expect(UserService.udpateUser).not.toHaveBeenCalled();

        await new Promise(r => setTimeout(r, 0));

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.new-arrivals.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.new-arrivals.error");
    });

    it('component submit UserService.udpateUser failed', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    firstname: 'Test',
                    lastname: 'TEST',
                    id: 'u-1',
                }];
            }
        );

        NewArrivalsService.getNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        NewArrivalsService.createNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'na-1'
                }
            }
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toBeCalledWith({
            filter: {
                newArrivalsUsersId: {
                    attributeExists: false
                }
            }
        });

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
                value: '2022'
            }
        });

        fireEvent.change(selects[0], {
            target: {
                value: 'u-1'
            }
        });

        const button = screen.getByText(/admin.new-arrivals.save/i);

        await waitFor(async () => {
            fireEvent.click(button);
            await waitFor(async () => {
                expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledTimes(1);
                expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledWith({
                    filter: {
                        date: {
                            eq: '2022-02-01'
                        }
                    }
                });
                await waitFor(async () => {
                    expect(NewArrivalsService.createNewArrivals).toHaveBeenCalledTimes(1);
                    expect(NewArrivalsService.createNewArrivals).toHaveBeenCalledWith({
                        input: {
                            date: '2022-02-01'
                        }
                    });
                });
            });
        });

        expect(UserService.udpateUser).toHaveBeenCalledTimes(1);
        expect(UserService.udpateUser).toHaveBeenCalledWith({
            input: {
                id: 'u-1',
                newArrivalsUsersId: 'na-1'
            }
        });

        await new Promise(r => setTimeout(r, 0));

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/admin.new-arrivals.error/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("admin.new-arrivals.error");
    });

    it('component submit with existing date', async () => {
        UserService.getUserLight = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    firstname: 'Test',
                    lastname: 'TEST',
                    id: 'u-1',
                }];
            }
        );

        NewArrivalsService.getNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'na-1'
                }];
            }
        );
        NewArrivalsService.createNewArrivals = jest.fn().mockImplementation(
            (value: object) => {}
        );
        UserService.udpateUser = jest.fn().mockImplementation(
            (value: object) => {}
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalFormAdd />
                </BrowserRouter>
            );
        });

        expect(UserService.getUserLight).toBeCalledWith({
            filter: {
                newArrivalsUsersId: {
                    attributeExists: false
                }
            }
        });

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
                value: '2022'
            }
        });

        fireEvent.change(selects[0], {
            target: {
                value: 'u-1'
            }
        });

        const button = screen.getByText(/admin.new-arrivals.save/i);

        await waitFor(async () => {
            fireEvent.click(button);
            await waitFor(async () => {
                expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledTimes(1);
                expect(NewArrivalsService.getNewArrivals).toHaveBeenCalledWith({
                    filter: {
                        date: {
                            eq: '2022-02-01'
                        }
                    }
                });
                await waitFor(async () => {
                    expect(NewArrivalsService.createNewArrivals).not.toHaveBeenCalled();

                    expect(UserService.udpateUser).toHaveBeenCalledTimes(1);
                    expect(UserService.udpateUser).toHaveBeenCalledWith({
                        input: {
                            id: 'u-1',
                            newArrivalsUsersId: 'na-1'
                        }
                    });
                });
            });
        });

        const success = screen.getByText(/admin.new-arrivals.success/i);
        expect(success).not.toHaveClass('hidden');
    });
});
 */
