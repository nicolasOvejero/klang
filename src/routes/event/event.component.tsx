import Calendar from '../../components/calendar/calendar.component';
import calendar from '../../assets/calendar.png';
import './event.style.scss';
import moment from 'moment';
import { useState } from 'react';
import wine from '../../assets/wine.png';
import winter from '../../assets/winter.png';
import halloween from '../../assets/halloween.png';
import User, { UserModel } from '../../components/user/user.component';

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

    const values: EventModel[] = [
        {
            date: moment().subtract(12, 'day').toDate(),
            image: 'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            participants: [
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                },
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                },
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                },
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                },
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                },
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                },
                {
                    image: 'https://laviedesreines.com/wp-content/uploads/2022/02/Comment-devenir-une-personne-solaire-pour-obtenir-tout-ce-que-vous-voulez-720x540.jpg',
                    firstname: 'Angelina',
                    lastname: 'Dupond'
                },
                {
                    image: 'https://mobile-img.lpcdn.ca/lpca/924x/r3996/f8b5b7e3-89e4-11e9-9f79-0e7266730414.jpg',
                    firstname: 'Pierre',
                    lastname: 'Dupuit'
                }
            ],
            type: 'Sortie au bar Le Benelux',
            address: {
                city: 'Montréal',
                street: '2190 rue sainte catherine ouest',
            },
            schedule: '17h - 19h'
        },
        {
            date: moment().subtract(10, 'day').toDate(),
            image: 'https://img.lemde.fr/2016/03/07/0/0/4256/2832/664/0/75/0/e4aa8ed_17040-1fko2ho.jpg',
            participants: [],
            type: 'Soirée escape game',
            address: {
                city: 'Montréal',
                street: '2190 rue sainte catherine ouest',
            },
            schedule: '17h - 21h'
        }
    ]

    const showEventDescription = (selectedDay: EventModel) => {
        console.log(selectedDay);
        setIsInfoOpen(true);
        setSelectedDate(selectedDay);
    }

    const handleClose = () => {
        setIsInfoOpen(false);
    }

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
                                    return <User user={user}></User>
                                })
                            }
                        </div>
                    }
                    {
                        selectedDate?.participants?.length === 0 &&
                        <p className='no-users'>Aucun participants pour le moment</p>
                    }
                </aside>
                <Calendar
                    iconHover={calendar}
                    color='secondary'
                    daySelectedHandler={showEventDescription}
                    selectedDay={ values }
                />
            </section>
        </article>
    )
}

export default Event;
