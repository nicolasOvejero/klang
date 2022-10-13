import welcome from '../../assets/welcome.png';
import moment from 'moment';
import 'moment/locale/fr';
import User, { UserModel } from '../../components/user/user.component';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader.component';
import RequestService from '../../common/services/new-arrivals.service';
import RequestError from '../../common/errors/request-error';
import './new-arrivals.styls.scss';

export type NewArrivalModel = {
    id: string;
    date: Date;
    users: UserModel[];
}

function NewArrivals() {
    const [newArrivales, setNewArrivales] = useState<NewArrivalModel[]>([]);
    const [loading, setLoading] = useState(true);

    moment.locale('fr');
    const start = moment().startOf('week').format('DD MMMM');
    const end = moment().endOf('week').format('DD MMMM');

    const getEvents = async () => {
        const startReq = moment().startOf('week').format('YYYY-MM-DD');
        const endReq = moment().endOf('week').format('YYYY-MM-DD');

        try {
            const newArrivales = await RequestService.getNewArrivals({
                filter: {
                    date: {
                        ge: startReq,
                        le: endReq
                    }
                }
            });
            setNewArrivales(newArrivales);
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
        <article className='body new-arrivals'>
            <section className='title-container'>
                <h1 className='title'>
                    Les nouveaux arrivants
                </h1>
            </section>
            <section className='new-arrivals-container'>
                <div className='new-arrivals-image'>
                    <img
                        alt='people with welcome banner'
                        src={welcome}
                    />
                </div>
                <div className='new-arrivals-list'>
                    <h3 className='calendar-title'>
                        Du {start} au {end}
                    </h3>
                    {
                        loading && (<div className='calendar-position'>
                            <Loader></Loader>
                        </div>)
                    }
                    {
                        !loading && newArrivales.length > 0 && (<ul className='list'>
                            {
                                newArrivales.map((arrival) => {
                                    const listItems: JSX.Element[] = [];
                                    const dateString = moment(arrival.date).format('DD MMMM');
                                    listItems.push(<li key={dateString} className='list-header'>
                                        {dateString}
                                    </li>);
                                    listItems.push(...arrival.users.map((user) => {
                                        user.size = 'medium';
                                        return (<li key={user.id}>
                                            <User user={user}></User>
                                        </li>)
                                    }));
                                    return listItems;
                                })
                            }
                        </ul>)
                    }
                    {
                        !loading && newArrivales.length === 0 && (
                            <div className='no-new-arrivals'>
                                Aucun nouveaux arrivants <br />pour cette semaine
                            </div>
                        )
                    }
                </div>
            </section>
        </article>
    )
}

export default NewArrivals;
