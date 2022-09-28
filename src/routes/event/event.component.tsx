import Calendar from '../../components/calendar/calendar.component';
import calendar from '../../assets/calendar.png';
import './event.style.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import wine from '../../assets/wine.png';
import winter from '../../assets/winter.png';
import halloween from '../../assets/halloween.png';
import User, { UserModel } from '../../components/user/user.component';
import { listEvents, ListEventsQuery } from '../../components/custom-queries';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import Loader from '../../components/loader/loader.component';

export type EventModel = {
    date: Date;
    image?: string;
    participants?: UserModel[];
    type: string;
    address?: {
        city: string;
        street: string;
    };
    schedule?: string;
}

function Event() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<EventModel>();
    const [events, setEvents] = useState<EventModel[]>([]);
    const [loading, setLoading] = useState(true);

    const showEventDescription = (selectedDay: EventModel) => {
        console.log(selectedDay);
        setIsInfoOpen(true);
        setSelectedDate(selectedDay);
    }

    const handleClose = () => {
        setIsInfoOpen(false);
    }

    const getEvents = async () => {
        const apiData = await API.graphql({
            query: listEvents,
        }) as GraphQLResult<ListEventsQuery>;
        const items = apiData.data?.listEvents?.items;
        if (items) {
            setEvents(items.map((item) => {
                return {
                    date: moment(item?.date).toDate(),
                    image: item?.image || '',
                    type: item?.type || '',
                    address: {
                        city: item?.address?.city || '',
                        street: item?.address?.street || '',
                    },
                    schedule: item?.schedule || '', 
                    participants: item?.participants?.items?.map((user) => {
                        return {
                            lastname: user?.user.lastname || '',
                            firstname: user?.user.firstname || '',
                            image: user?.user.image || ''
                        }
                    })
                }
            }));
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    } 

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <article className='body'>
            <section className='title-container'>
                <h1 className='title'>
                    Les événements du mois
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
                    <h3 className='date'>
                        { moment(selectedDate?.date).format('DD MMMM yyyy') }
                    </h3>
                    <div className='image' style={{ backgroundImage: `url(${selectedDate?.image})` }}></div>
                    <div className='info-grid'>
                        <p className='head'>
                            Type d'événement :
                        </p>
                        <p className='type'>
                            { selectedDate?.type }
                        </p>
                        <p className='head'>
                            Adresse :
                        </p>
                        <p className='address'>
                            { selectedDate?.address?.street }, { selectedDate?.address?.city }
                        </p>
                        <p className='head'>
                            Heure :
                        </p>
                        <p className='schedule'>
                            { selectedDate?.schedule }
                        </p>
                    </div>
                    <hr />
                    <p>
                        Participants :
                    </p>
                    {
                        selectedDate?.participants &&
                        <div className="users">
                            {
                                selectedDate?.participants?.map((user) => {
                                    user.size = 'small';
                                    return <User key={user.lastname+user.firstname} user={user}></User>
                                })
                            }
                        </div>
                    }
                    {
                        selectedDate?.participants?.length === 0 &&
                        <p className='no-users'>Aucun participants pour le moment</p>
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
        </article>
    )
}

export default Event;
