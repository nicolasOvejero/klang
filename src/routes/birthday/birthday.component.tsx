import Calendar from "../../components/calendar/calendar.component";
import partyImage from '../../assets/party.png';
import cake from '../../assets/cake.png';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ReactComponent as Background } from '../../assets/bg-party.svg';
import User, { UserModel } from "../../components/user/user.component";
import Loader from "../../components/loader/loader.component";
import RequestError from "../../common/errors/request-error";
import BirthdayService from "../../common/services/birthday.service";
import { useTranslation } from "react-i18next";
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import './birthday.style.scss';

export type BirthdayModel = {
    id: string;
    date: Date;
    users?: UserModel[];
}

function Birthday() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<BirthdayModel>();
    const [birthdays, setBirthdays] = useState<BirthdayModel[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const showEventDescription = (selectedDay: BirthdayModel) => {
        setIsInfoOpen(true);
        setSelectedDate(selectedDay);
    }

    const handleClose = () => {
        setIsInfoOpen(false);
    }

    const getBirthdays = async () => {
        const currentMonth = moment().format('MM');

        try {
            const birthdays = await BirthdayService.getBirthdays({
                filter: {
                    date: {
                        contains: `-${currentMonth}-`, 
                    }
                }
            });
            setBirthdays(birthdays);
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
       getBirthdays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <article className='body birthdays'>
            <section className="title-container">
                <h1 className="title">
                    {t('birthdays.title')}
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
                    <Close
                        className='close'
                        onClick={handleClose}
                    />
                    <Background className='background' />
                    <h3 className="date">
                        {moment(selectedDate?.date).format('DD MMMM')}
                    </h3>
                    <div className="users">
                        {
                            selectedDate?.users?.map((user) => {
                                user.showActions = true;
                                user.background = 'bg-white';
                                return (<User key={user.id} user={user}></User>)
                            })
                        }
                    </div>
                </aside>
            </section>
        </article>
    )
}

export default Birthday;
