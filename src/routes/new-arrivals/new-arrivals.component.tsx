import welcome from '../../assets/welcome.png';
import moment from 'moment';
import 'moment/locale/fr';
import './new-arrivals.styls.scss';
import User, { UserModel } from '../../components/user/user.component';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listNewArrivals, ListNewArrivalsQuery } from '../../components/custom-queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import Loader from '../../components/loader/loader.component';

type NewArrival = {
    date: Date;
    users: UserModel[];
}

function NewArrivals() {
    const [newArrivales, setNewArrivales] = useState<NewArrival[]>([]);
    const [loading, setLoading] = useState(true);

    moment.locale('fr');
    const start = moment().startOf('week').format('DD MMMM');
    const end = moment().endOf('week').format('DD MMMM');

    const getEvents = async () => {
        const apiData = await API.graphql({
            query: listNewArrivals,
        }) as GraphQLResult<ListNewArrivalsQuery>;
        const items = apiData.data?.listNewArrivals?.items;
        if (items) {
            setNewArrivales(items.map((item) => {
                return {
                    date: moment(item?.date).toDate(),
                    users: item?.users?.items?.map((user) => {
                        return {
                            id: user?.id || '',
                            lastname: user?.lastname || '',
                            firstname: user?.firstname || '',
                            image: user?.image || '',
                            job: user?.job || '',
                        }
                    }) || []
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
                        !loading && (<ul className='list'>
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
                </div>
            </section>
        </article>
    )
}

export default NewArrivals;
