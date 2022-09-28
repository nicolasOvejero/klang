import Calendar from "../../components/calendar/calendar.component";
import partyImage from '../../assets/party.png';
import cake from '../../assets/cake.png';
import './birthday.style.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ReactComponent as Background } from '../../assets/bg-party.svg';
import User, { UserModel } from "../../components/user/user.component";
import { API } from 'aws-amplify';
import { ListBirthdaysQuery, listBithday } from "../../components/custom-queries";
import { GraphQLResult } from "@aws-amplify/api";
import Loader from "../../components/loader/loader.component";

export type BirthdayModel = {
    date: Date;
    users?: UserModel[];
}

function Birthday() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<BirthdayModel>();
    const [birthdays, setBirthdays] = useState<BirthdayModel[]>([]);
    const [loading, setLoading] = useState(true);

    const showEventDescription = (selectedDay: BirthdayModel) => {
        console.log(selectedDay);
        setIsInfoOpen(true);
        setSelectedDate(selectedDay);
    }

    const handleClose = () => {
        setIsInfoOpen(false);
    }

    const getBirthdays = async () => {
        const apiData = await API.graphql({
            query: listBithday,
        }) as GraphQLResult<ListBirthdaysQuery>;
        const items = apiData.data?.listBirthdays?.items;
        if (items) {
            setBirthdays(items.map((item) => {
                return {
                    date: moment(item?.date).toDate(),
                    users: item?.users?.items?.map((user) => {
                        return {
                            lastname: user?.lastname || '',
                            firstname: user?.firstname || '',
                            image: user?.image || ''
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
       getBirthdays();
    }, []);

    return (
        <article className='body birthdays'>
            <section className="title-container">
                <h1 className="title">
                    Les anniversaires du mois
                </h1>
            </section>
            <section className='birthday-container'>
                {
                    !loading && (<Calendar
                        iconHover={cake}
                        color='primary'
                        daySelectedHandler={showEventDescription}
                        selectedDay={ birthdays }
                    />)
                }
                {
                    loading && (<div className='calendar-position'>
                        <Loader></Loader>
                    </div>)
                }
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
