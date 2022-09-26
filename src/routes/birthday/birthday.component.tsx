import Calendar from "../../components/calendar/calendar.component";
import partyImage from '../../assets/party.png';
import cake from '../../assets/cake.png';
import './birthday.style.scss';
import moment from 'moment';
import { useState } from 'react';
import { ReactComponent as Background } from '../../assets/bg-party.svg';
import User, { UserModel } from "../../components/user/user.component";

export type BirthdayModel = {
    date: Date;
    users?: UserModel[];
}

function Birthday() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<BirthdayModel>();

    const values: BirthdayModel[] = [
        {
            date: moment().subtract(12, 'day').toDate(),
            users: [
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
            ]
        },
        {
            date: moment().subtract(10, 'day').toDate(),
        },
        {
            date: moment().subtract(15, 'day').toDate(),
        },
        {
            date: moment().subtract(1, 'day').toDate(),
        },
        {
            date: moment().add(2, 'day').toDate(),
        },
    ]

    const showEventDescription = (selectedDay: BirthdayModel) => {
        console.log(selectedDay);
        setIsInfoOpen(true);
        setSelectedDate(selectedDay);
    }

    const handleClose = () => {
        setIsInfoOpen(false);
    }

    return (
        <article className='body'>
            <section className="title-container">
                <h1 className="title">
                    Les anniversaires du mois
                </h1>
            </section>
            <section className='birthday-container'>
                <Calendar
                    iconHover={cake}
                    color='primary'
                    daySelectedHandler={showEventDescription}
                    selectedDay={ values }
                />
                <div className='birthday-image'>
                    <img
                        alt="party for birthday"
                        src={partyImage}
                    />
                </div>
                <aside className={`birthday-informations ${isInfoOpen ? 'open' : ''}`}>
                    <span
                        className='close material-symbols-outlined'
                        onClick={handleClose}
                    >
                        close
                    </span>
                    <Background className='background' />
                    <h3 className="date">
                        {moment(selectedDate?.date).format('DD MMMM yyyy')}
                    </h3>
                    <div className="users">
                        {
                            selectedDate?.users?.map((user) => 
                                <User user={user}></User>
                            )
                        }
                    </div>
                </aside>
            </section>
        </article>
    )
}

export default Birthday;
