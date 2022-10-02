import API, { GraphQLResult } from '@aws-amplify/api';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { listEventsLight, ListEventsLightQuery } from '../../../custom-queries';
import moment from 'moment';
import './event-form-remove.style.scss';
import Dropdown, { DropdownOption } from '../../../dropdown/dropdown.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import { deleteEvent } from '../../../../graphql/mutations';
import { DeleteEventMutation } from '../../../../API';
import { graphqlOperation } from 'aws-amplify';

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
        const apiData = await API.graphql({
            query: listEventsLight,
            variables: {
                filter: {
                    date: {
                        ge: moment().add(-1, 'month').format('YYYY-MM-DD')
                    }
                }
            }
        }) as GraphQLResult<ListEventsLightQuery>;

        setOriginialEvents(apiData.data);

        const items: any[] = (apiData.data?.listEvents?.items.filter((v) => v != null)) || [];
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
    }

    const deleteSubscribers = async () => {
        const eventValues = originalEvents?.listEvents?.items.find((event) => event?.id === idEvent);

        const txnMutation: any = eventValues?.participants?.items.map((p, i) => {
            return `mutation${i}: deleteUsersEvents(input: {id: "${p?.id}"}) { id }`;
        });

        const deleteReturn = await API.graphql(
            graphqlOperation(`
                mutation batchMutation {
                    ${txnMutation}
                }
            `)
        ) as GraphQLResult;

        if (deleteReturn.errors) {
            setEventRemoveState({
                ...eventRemoveState,
                formHasError: true,
                formError: 'Impossible de supprimer les participants'
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

        const deleteReturn = await API.graphql({
            query: deleteEvent,
            variables: {
                input: {
                    id: idEvent
                }
            }
        }) as GraphQLResult<DeleteEventMutation>;

        if (deleteReturn.errors) {
            setEventRemoveState({
                ...eventRemoveState,
                formHasError: true,
                formError: "Impossible de supprimer l'événement"
            });
        }

        getEvents();

        setEventRemoveState({
            ...eventRemoveState,
            success: true
        });

        setTimeout(() => {
            setEventRemoveState(eventRemoveState);
        }, 2000)
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <form
            onSubmit={handlerSubmit}
            className='form-event-delete'
        >
            <Dropdown
                label='Quel événement ?'
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
                label='Supprimer'
                type='submit'
                disabled={!idEvent}
            />
            <Toaster
                message="L'événement a bien été supprimé"
                type='success'
                display={success}
            />
        </form>
    );
}

export default EventFormRemove;
