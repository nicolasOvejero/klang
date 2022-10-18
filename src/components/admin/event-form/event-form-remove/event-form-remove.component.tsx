import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ListEventsLightQuery } from '../../../custom-queries';
import moment from 'moment';
import Dropdown, { DropdownOption } from '../../../dropdown/dropdown.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import RequestError from '../../../../common/errors/request-error';
import EventService from '../../../../common/services/event.service';
import UserService from '../../../../common/services/user.service';
import './event-form-remove.style.scss';
import { useTranslation } from 'react-i18next';

const defaultEventDeleteState = {
    idEvent: '',
    subscribers: 0,
    formHasError: false,
    formError: '',
    success: false
};

function EventFormRemove() {
    const [originalEvents, setOriginialEvents] = useState<ListEventsLightQuery | undefined>(undefined);
    const [events, setEvents] = useState<DropdownOption[]>([]);
    const [eventRemoveState, setEventRemoveState] = useState(defaultEventDeleteState);
    const { idEvent, subscribers, formHasError, formError, success } = eventRemoveState;
    const { t } = useTranslation();

    const handleSelecteChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        const eventValues = originalEvents?.listEvents?.items.find((event) => event?.id === value);

        setEventRemoveState({
            ...eventRemoveState,
            [name]: value,
            subscribers:  eventValues?.participants?.items?.length || 0,
            formHasError: false,
            formError: ''
        });
    }

    const getEvents = async () => {
        try {
            const apiData = await EventService.getEventsLight({
                filter: {
                    date: {
                        ge: moment().add(-1, 'month').format('YYYY-MM-DD')
                    }
                }
            });

            setOriginialEvents(apiData);

            const items: any[] = (apiData?.listEvents?.items.filter((v) => v != null)) || [];
            setEvents(
                [{
                    value: '',
                    label: ''
                }]
                .concat(items.map((item) => {
                    return {
                        label: `${moment(item.date).format('DD/MM/YYYY')} - ${item.type}`,
                        value: item.id,
                    }
                }))
            );
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    const deleteSubscribers = async () => {
        try {
            const eventValues = originalEvents?.listEvents?.items.find((event) => event?.id === idEvent);

            const mutations: any = eventValues?.participants?.items.map((p, i) => {
                return `mutation${i}: deleteUsersEvents(input: {id: "${p?.id}"}) { id }`;
            });

            await UserService.bulkDeleteUsers(mutations);
        } catch (error: unknown) {
            setEventRemoveState({
                ...eventRemoveState,
                formHasError: true,
                formError: t('admin.events.error-participants')
            });
        }
    }

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!idEvent) {
            return;
        }

        if (subscribers > 0) {
            await deleteSubscribers();
        }

        try {
            await EventService.deleteEvent({
                input: {
                    id: idEvent
                }
            });

            getEvents();

            setEventRemoveState({
                ...eventRemoveState,
                success: true
            });

            setTimeout(() => {
                setEventRemoveState(defaultEventDeleteState);
            }, 2000)
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
            setEventRemoveState({
                ...eventRemoveState,
                formHasError: true,
                formError: t('admin.events.error-delete')
            });
        }
    }

    useEffect(() => {
        getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form
            onSubmit={handlerSubmit}
            className='form-event-delete'
        >
            <Dropdown
                label={t('admin.events.event')}
                value={idEvent}
                name='idEvent'
                required
                haserror={formHasError}
                errormessage={formError}
                onChange={handleSelecteChange}
                options={events}
            />
            {
                subscribers > 0 && (
                    <p className='warning-message'>
                        Attention il y a { subscribers } personne(s) inscrite(s) à l'événement
                    </p>
                )
            }
            <Button
                label={t('admin.events.delete')}
                type='submit'
                disabled={!idEvent}
            />
            <Toaster
                message={t('admin.events.success-delete')}
                type='success'
                display={success}
            />
        </form>
    );
}

export default EventFormRemove;
