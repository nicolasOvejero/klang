import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import NewArrivalsService from '../../../../common/services/new-arrivals.service';
import { createTestStore, getAllByTagName, getByClass } from '../../../../setupTests';
import EventFormAdd from './event-form-add.component';
import moment from 'moment';
import EventService from '../../../../common/services/event.service';
import { Provider } from 'react-redux';
import { USER_ACTION_TYPES } from '../../../../store/user/user.types';

let store = createTestStore();

store.dispatch({
    type: USER_ACTION_TYPES.SET_USER,
    payload: {
        id: 'u-1'
    }
});

describe('render event form add', () => {
    it('component default', () => {
        render(
            <Provider store={store}>
                <EventFormAdd />
            </Provider>
        );

        const mainDiv = getByClass('form-event-add', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv.tagName).toEqual('FORM');

        const inputImage = screen.getByText(/admin.events.image/i);
        expect(inputImage).toBeInTheDocument();

        const inputType = screen.getByText(/admin.events.type/i);
        expect(inputType).toBeInTheDocument();

        const inputSchedule = screen.getByText(/admin.events.schedule/i);
        expect(inputSchedule).toBeInTheDocument();

        const inputCity = screen.getByText(/admin.events.city/i);
        expect(inputCity).toBeInTheDocument();

        const inputStreet = screen.getByText(/admin.events.street/i);
        expect(inputStreet).toBeInTheDocument();

        const selectDay = screen.getByText(/inputs.day/i);
        expect(selectDay).toBeInTheDocument();

        const selectMonth = screen.getByText(/inputs.month/i);
        expect(selectMonth).toBeInTheDocument();

        const selectYear = screen.getByText(/inputs.year/i);
        expect(selectYear).toBeInTheDocument();

        const button = screen.getByText(/admin.events.save/i);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toEqual('BUTTON');

        const success = screen.getByText(/admin.events.success/i);
        expect(success).toBeInTheDocument();
        expect(success.tagName).toEqual('DIV');
        expect(success).toHaveClass('toaster', 'hidden', 'success');
    });

    it('component submit do nothing', () => {
        NewArrivalsService.createAddress = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('error');
            }
        );

        render(
            <Provider store={store}>
                <EventFormAdd />
            </Provider>
        );

        const button = screen.getByText(/admin.events.save/i);
        fireEvent.click(button);

        expect(NewArrivalsService.createAddress).not.toHaveBeenCalled();
    });

    it('component submit NewArrivalsService.createAddress failed', async () => {
        NewArrivalsService.createAddress = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('error');
            }
        );

        render(
            <Provider store={store}>
                <EventFormAdd />
            </Provider>
        );

        setFields();

        const button = screen.getByText(/admin.events.save/i);
        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(NewArrivalsService.createAddress).toHaveBeenCalledTimes(1);
        expect(NewArrivalsService.createAddress).toHaveBeenCalledWith({
            input: {
                city: 'Montreal',
                street: 'Rue Sainte Catherine Ouest'
            }
        });

        checkError();
    });

    it('component submit EventService.createEvent failed', async () => {
        NewArrivalsService.createAddress = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'ad-1'
                };
            }
        );

        EventService.createEvent = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Error');
            }
        );

        render(
            <Provider store={store}>
                <EventFormAdd />
            </Provider>
        );

        setFields();

        const formatedDate = `${moment().year()}-${('0' + moment().month()).slice(-2)}-${('0' + moment().date()).slice(-2)}`;
        const button = screen.getByText(/admin.events.save/i);
        await waitFor(async () => {
            fireEvent.click(button);
        });

        expect(NewArrivalsService.createAddress).toHaveBeenCalledTimes(1);
        expect(NewArrivalsService.createAddress).toHaveBeenCalledWith({
            input: {
                city: 'Montreal',
                street: 'Rue Sainte Catherine Ouest',
            }
        });

        await waitFor(() => {
            expect(EventService.createEvent).toBeCalledTimes(1);
            expect(EventService.createEvent).toBeCalledWith({
                input: {
                    image: 'test-image',
                    type: 'Type trop cool',
                    schedule: 'de 14h - 00h',
                    date: formatedDate,
                    eventAddressId: 'ad-1',
                    eventCreateById: 'u-1',
                    published: false,
                }
            });

            checkError();
        })
    });

    it('component submit success', async () => {
        NewArrivalsService.createAddress = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'ad-1'
                };
            }
        );

        EventService.createEvent = jest.fn().mockImplementation(
            (value: object) => {}
        );

        render(
            <Provider store={store}>
                <EventFormAdd />
            </Provider>
        );

        setFields();

        const formatedDate = `${moment().year()}-${('0' + moment().month()).slice(-2)}-${('0' + moment().date()).slice(-2)}`;
        const button = screen.getByText(/admin.events.save/i);
        await waitFor(async () => {
            fireEvent.click(button);
        });

        expect(NewArrivalsService.createAddress).toHaveBeenCalledTimes(1);
        expect(NewArrivalsService.createAddress).toHaveBeenCalledWith({
            input: {
                city: 'Montreal',
                street: 'Rue Sainte Catherine Ouest'
            }
        });

        await waitFor(() => {
            expect(EventService.createEvent).toBeCalledTimes(1);
            expect(EventService.createEvent).toBeCalledWith({
                input: {
                    image: 'test-image',
                    type: 'Type trop cool',
                    schedule: 'de 14h - 00h',
                    date: formatedDate,
                    eventAddressId: 'ad-1',
                    eventCreateById: 'u-1',
                    published: false,
                }
            });

            const success = screen.getByText(/admin.events.success/i);
            expect(success).not.toHaveClass('hidden');
        });
    });

    function setFields() {
                const selects = getAllByTagName('select', screen);

        fireEvent.change(selects[0], {
            target: {
                value: moment().date()
            }
        });

        fireEvent.change(selects[1], {
            target: {
                value: moment().month()
            }
        });

        fireEvent.change(selects[2], {
            target: {
                value: moment().year()
            }
        });

        const inputImage = screen.getByLabelText(/admin.events.image/i);
        const inputType = screen.getByLabelText(/admin.events.type/i);
        const inputSchedule = screen.getByLabelText(/admin.events.schedule/i);
        const inputCity = screen.getByLabelText(/admin.events.city/i);
        const inputStreet = screen.getByLabelText(/admin.events.street/i);

        fireEvent.change(inputImage, { target: { value: 'test-image' } });
        fireEvent.change(inputType, { target: { value: 'Type trop cool' } });
        fireEvent.change(inputSchedule, { target: { value: 'de 14h - 00h' } });
        fireEvent.change(inputCity, { target: { value: 'Montreal' } });
        fireEvent.change(inputStreet, { target: { value: 'Rue Sainte Catherine Ouest' } });
    }

    function checkError() {
        const labels = getAllByTagName('label', screen);
        const errorImage = within(labels[0]).getByText(/admin.birthdays.error/i);
        expect(errorImage).toBeInTheDocument();
        expect(errorImage.innerHTML).toEqual("admin.birthdays.error");

        const errorType = within(labels[1]).getByText(/admin.birthdays.error/i);
        expect(errorType).toBeInTheDocument();
        expect(errorType.innerHTML).toEqual("admin.birthdays.error");

        const errorSchedule = within(labels[2]).getByText(/admin.birthdays.error/i);
        expect(errorSchedule).toBeInTheDocument();
        expect(errorSchedule.innerHTML).toEqual("admin.birthdays.error");

        const errorCity = within(labels[3]).getByText(/admin.birthdays.error/i);
        expect(errorCity).toBeInTheDocument();
        expect(errorCity.innerHTML).toEqual("admin.birthdays.error");

        const errorStreet = within(labels[4]).getByText(/admin.birthdays.error/i);
        expect(errorStreet).toBeInTheDocument();
        expect(errorStreet.innerHTML).toEqual("admin.birthdays.error");
    }
});
