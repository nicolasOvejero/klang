import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventService from '../../../../common/services/event.service';
import UserService from '../../../../common/services/user.service';
import { getByClass, getByTagName } from '../../../../setupTests';
import EventFormRemove from './event-form-remove.component';

describe('render event form remove', () => {
    it('component default', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        const mainDiv = getByClass('form-event-delete', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv.tagName).toEqual('FORM');

        const selectYear = screen.getByText(/admin.events.event/i);
        expect(selectYear).toBeInTheDocument();

        const button = screen.getByText(/admin.events.delete/i);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toEqual('BUTTON');

        const success = screen.getByText(/admin.events.success-delete/i);
        expect(success).toBeInTheDocument();
        expect(success.tagName).toEqual('DIV');
        expect(success).toHaveClass('toaster', 'hidden', 'success');
    });

    it('component EventService.getEventsLight failed', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        const label = getByTagName('label', screen);
        const errorSelect = within(label).getByText(/admin.events.error/i);
        expect(errorSelect).toBeInTheDocument();
        expect(errorSelect.innerHTML).toEqual("admin.events.error");
    });

    it('component show participants message', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    listEvents: {
                        items: [{
                            date: '2025-01-01',
                            type: 'Nouvel an',
                            id: 'e-1',
                            participants: {
                                items: [
                                    { id: 'u-1' },
                                    { id: 'u-2' },
                                ]
                            }
                        }]
                    }
                }
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        await new Promise(r => setTimeout(r, 0));

        const select = getByTagName('select', screen);
        fireEvent.change(select, {
            target: {
                value: 'e-1'
            }
        });

        const warning = getByClass('warning-message', screen);
        expect(warning).toBeInTheDocument();
        expect(warning.innerHTML).toEqual("Attention il y a 2 personne(s) inscrite(s) à l'événement");
    });

    it('component not show participants message', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    listEvents: {
                        items: [{
                            date: '2025-01-01',
                            type: 'Nouvel an',
                            id: 'e-1',
                            participants: {
                                items: []
                            }
                        }]
                    }
                }
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        await new Promise(r => setTimeout(r, 0));

        const select = getByTagName('select', screen);
        fireEvent.change(select, {
            target: {
                value: 'e-1'
            }
        });

        const warning = screen.queryByText("Attention il y a 0 personne(s) inscrite(s) à l'événement");
        expect(warning).not.toBeInTheDocument();
    });

    it('component submit do nothing', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    listEvents: {
                        items: [{
                            date: '2025-01-01',
                            type: 'Nouvel an',
                            id: 'e-1',
                            participants: {
                                items: []
                            }
                        }]
                    }
                }
            }
        );
        EventService.deleteEvent = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        const button = screen.getByText(/admin.events.delete/i);
        button.removeAttribute('disabled');
        await waitFor(async () => {
            fireEvent.click(button);
        });

        expect(EventService.deleteEvent).not.toHaveBeenCalled();
    });

    it('component submit EventService.deleteEvent failed', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    listEvents: {
                        items: [{
                            date: '2025-01-01',
                            type: 'Nouvel an',
                            id: 'e-1',
                            participants: {
                                items: []
                            }
                        }]
                    }
                }
            }
        );
        EventService.deleteEvent = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        await new Promise(r => setTimeout(r, 0));

        const select = getByTagName('select', screen);
        fireEvent.change(select, {
            target: {
                value: 'e-1'
            }
        });

        const button = screen.getByText(/admin.events.delete/i);
        await waitFor(async () => {
            fireEvent.click(button);
        });

        expect(EventService.deleteEvent).toHaveBeenCalledTimes(1);
        expect(EventService.deleteEvent).toHaveBeenCalledWith({
            input: {
                id: 'e-1'
            }
        });

        const label = getByTagName('label', screen);
        const errorSelect = within(label).getByText(/admin.events.error-delete/i);
        expect(errorSelect).toBeInTheDocument();
        expect(errorSelect.innerHTML).toEqual("admin.events.error-delete");
    });

    it('component submit UserService.bulkDeleteUsers failed', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    listEvents: {
                        items: [{
                            date: '2025-01-01',
                            type: 'Nouvel an',
                            id: 'e-1',
                            participants: {
                                items: [
                                    { id: 'u-1' },
                                    { id: 'u-2' },
                                ]
                            }
                        }]
                    }
                }
            }
        );
        UserService.bulkDeleteUsers = jest.fn().mockImplementation(
            (value: any) => {
                throw new Error('oups');
            }
        );
        EventService.deleteEvent = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('oups');
            }
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        expect(EventService.getEventsLight).toHaveBeenCalledTimes(1);

        await new Promise(r => setTimeout(r, 0));

        const select = getByTagName('select', screen);
        fireEvent.change(select, {
            target: {
                value: 'e-1'
            }
        });

        const button = screen.getByText(/admin.events.delete/i);
        await waitFor(async () => {
            fireEvent.click(button);
        });

        expect(UserService.bulkDeleteUsers).toHaveBeenCalledTimes(1);
        expect(UserService.bulkDeleteUsers).toHaveBeenCalledWith([
            'mutation0: deleteUsersEvents(input: {id: "u-1"}) { id }',
            'mutation1: deleteUsersEvents(input: {id: "u-2"}) { id }'
        ]);

        await new Promise(r => setTimeout(r, 0));

        const label = getByTagName('label', screen);
        const errorSelect = within(label).getByText(/admin.events.error-delete/i);
        expect(errorSelect).toBeInTheDocument();
        expect(errorSelect.innerHTML).toEqual("admin.events.error-delete");
    });

    it('component submit success', async () => {
        EventService.getEventsLight = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    listEvents: {
                        items: [{
                            date: '2025-01-01',
                            type: 'Nouvel an',
                            id: 'e-1',
                            participants: {
                                items: [
                                    { id: 'u-1' },
                                    { id: 'u-2' },
                                ]
                            }
                        }]
                    }
                }
            }
        );
        UserService.bulkDeleteUsers = jest.fn().mockImplementation(
            (value: any) => {}
        );
        EventService.deleteEvent = jest.fn().mockImplementation(
            (value: object) => {}
        );

        await waitFor(() => {
            render(
                <BrowserRouter>
                    <EventFormRemove />
                </BrowserRouter>
            );
        });

        await new Promise(r => setTimeout(r, 0));

        const select = getByTagName('select', screen);
        fireEvent.change(select, {
            target: {
                value: 'e-1'
            }
        });

        const button = screen.getByText(/admin.events.delete/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(UserService.bulkDeleteUsers).toHaveBeenCalledTimes(1);
            expect(UserService.bulkDeleteUsers).toHaveBeenCalledWith([
                'mutation0: deleteUsersEvents(input: {id: "u-1"}) { id }',
                'mutation1: deleteUsersEvents(input: {id: "u-2"}) { id }'
            ]);

            await waitFor(async () => {
                expect(EventService.deleteEvent).toBeCalledTimes(1);
                expect(EventService.deleteEvent).toBeCalledWith({
                    input: {
                        id: 'e-1'
                    }
                });
            });
        });

        expect(EventService.getEventsLight).toBeCalledTimes(2);
        const success = screen.getByText(/min.events.success-delete/i);
        expect(success).not.toHaveClass('hidden');
    });
});
