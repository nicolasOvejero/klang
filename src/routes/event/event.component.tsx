import Calendar from '../../components/calendar/calendar.component';
import calendar from '../../assets/calendar.png';
import moment from 'moment';
import { useEffect, useState } from 'react';
import wine from '../../assets/wine.png';
import winter from '../../assets/winter.png';
import halloween from '../../assets/halloween.png';
import User, { UserModel } from '../../components/user/user.component';
import Loader from '../../components/loader/loader.component';
import Button from '../../components/button/button.component';
import { useSelector } from 'react-redux';
import { selectUserReducer } from '../../store/user/user.selector';
import Toaster from '../../components/toaster/toaster.component';
import RequestError from '../../common/errors/request-error';
import UserService from '../../common/services/user.service';
import EventService from '../../common/services/event.service';
import { useTranslation } from 'react-i18next';
import './event.style.scss';

export type EventModel = {
    id: string;
    date: Date;
    image?: string | null;
    participants?: UserModel[];
    type: string | undefined | null;
    address?: {
        city: string | undefined | null;
        street: string | undefined | null;
    };
    schedule?: string | null;
}

type EventDefaultState = {
    disableSubscription: boolean;
    success: boolean;
}

const defaultState = {
    disableSubscription: false,
    success: false
} 

function Event() {
    const user = useSelector(selectUserReducer);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<EventModel>();
    const [events, setEvents] = useState<EventModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [eventState, setEventState] = useState<EventDefaultState>(defaultState);
    const { t } = useTranslation();

    const showEventDescription = (selectedDay: EventModel) => {
        setIsInfoOpen(true);
        setSelectedDate(selectedDay);
        if (selectedDay.participants?.find((p) => p.id === user.id)) {
            setEventState({
                ...eventState,
                disableSubscription: true,
            })
        }
    }

    const handleClose = () => {
        setIsInfoOpen(false);
    }

    const subscribeEvent = async() => {
        if (eventState.disableSubscription) {
            return;
        }
        
        const eventId = selectedDate?.id;
        const userId = user.id;

        try {
            const subscription = await UserService.createUsersEvents({
                input: {
                    eventID: eventId, 
                    userID: userId
                }
            });

            const event = events.find((event) => event.id === selectedDate?.id);

            if (event && subscription) {
                event?.participants?.push(
                    {
                        id: subscription.user.id,
                        lastname: subscription.user.lastname,
                        firstname: subscription.user.firstname,
                        image: subscription.user.image
                    }
                );
                setEvents([
                    ...events
                ]);

                setEventState({
                    disableSubscription: true,
                    success: true
                });
                setTimeout(() => {
                    setEventState({
                        disableSubscription: true,
                        success: false
                    });
                }, 2000);
            }
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    const getEvents = async () => {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
        
        try {
            const events = await EventService.getEvents({
                filter: {
                    date: {
                        ge: startOfMonth, 
                        le: endOfMonth
                    }
                }
            });
            setEvents(events);
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    } 

    useEffect(() => {
        getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <article className='body events'>
            <section className='title-container'>
                <h1 className='title'>
                    {t('events.title')}
                </h1>
            </section>
            <section className='event-container'>
                <div className='event-image'>
                    <img
                        alt='halloween event'
                        src={halloween}
                        className='image-1'
                    />
                    <img
                        alt='bottle of wine and glass'
                        src={wine}
                        className='image-2'
                    />
                    <img
                        alt='winter party'
                        src={winter}
                        className='image-3'
                    />
                </div>
                <aside className={`event-informations ${isInfoOpen ? 'open' : ''}`}>
                    <span
                        className='close material-symbols-outlined'
                        onClick={handleClose}
                    >
                        close
                    </span>
                    <div className='header'>
                        <Button
                            label={t('events.subscribe')}
                            type='button'
                            color='secondary'
                            clickHandler={subscribeEvent}
                            disabled={ eventState.disableSubscription }
                        />
                        <h3 className='date'>
                            { moment(selectedDate?.date).format('DD MMMM yyyy') }
                        </h3>
                    </div>
                    <div className='image' style={{ backgroundImage: `url(${selectedDate?.image})` }}></div>
                    <div className='info-grid'>
                        <p className='head'>
                            {t('events.type')}
                        </p>
                        <p className='type'>
                            { selectedDate?.type }
                        </p>
                        <p className='head'>
                            {t('events.address')}
                        </p>
                        <p className='address'>
                            { selectedDate?.address?.street }, { selectedDate?.address?.city }
                        </p>
                        <p className='head'>
                            {t('events.hour')}
                        </p>
                        <p className='schedule'>
                            { selectedDate?.schedule }
                        </p>
                    </div>
                    <hr />
                    <p>
                        {t('events.participants')}
                    </p>
                    {
                        selectedDate?.participants &&
                        <div className="users">
                            {
                                selectedDate?.participants?.map((user) => {
                                    user.size = 'small';
                                    return <User key={user.id} user={user}></User>
                                })
                            }
                        </div>
                    }
                    {
                        selectedDate?.participants?.length === 0 &&
                        <p className='no-users'>
                            {t('events.no-users')}
                        </p>
                    }
                </aside>
                {
                    loading && (<div className='calendar-position'>
                        <Loader></Loader>
                    </div>)
                }
                {
                    !loading && (<Calendar
                        iconHover={calendar}
                        color='secondary'
                        daySelectedHandler={showEventDescription}
                        selectedDay={ events }
                    />)
                }
            </section>
            <Toaster
                message={t('events.success')}
                type='success'
                display={eventState.success}
            />
        </article>
    )
}

export default Event;
