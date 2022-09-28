import welcome from '../../assets/welcome.png';
import moment from 'moment';
import 'moment/locale/fr';
import './new-arrivals.styls.scss';
import User, { UserModel } from '../../components/user/user.component';

type NewArrival = {
    date: Date;
    users: UserModel[];
}

function NewArrivals() {
    moment.locale('fr');
    const start = moment().startOf('week').format('DD MMMM');
    const end = moment().endOf('week').format('DD MMMM');
    
    const values: NewArrival[] = [{
        date: moment().add(-1, 'days').toDate(),
        users: [
            {
                image: 'https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg',
                firstname: 'Jean-Pierre',
                lastname: 'Ducailloux',
                job: 'Designer UI/UX',
            },
            {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Circle-icons-dev.svg/1200px-Circle-icons-dev.svg.png',
                firstname: 'Jean-Claude',
                lastname: 'Durocher',
                job: 'Developpeur Java/Angular',
            }
        ]
    },
    {
        date: moment().toDate(),
        users: [
            {
                image: 'https://www.conseiller.ca/wp-content/uploads/sites/4/2020/07/recrutement-emploi_800x600.jpg',
                firstname: 'Berteline',
                lastname: 'Delaplage',
                job: 'Recrutement / HR',
            },
            {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Circle-icons-dev.svg/1200px-Circle-icons-dev.svg.png',
                firstname: 'Jean-Claude',
                lastname: 'Durocher',
                job: 'Developpeur Java/Angular',
            },
        ]
    },
    {
        date: moment().add(1, 'day').toDate(),
        users: [
            {
                image: 'https://www.conseiller.ca/wp-content/uploads/sites/4/2020/07/recrutement-emploi_800x600.jpg',
                firstname: 'Berteline',
                lastname: 'Delaplage',
                job: 'Recrutement / HR',
            },
            {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Circle-icons-dev.svg/1200px-Circle-icons-dev.svg.png',
                firstname: 'Jean-Claude',
                lastname: 'Durocher',
                job: 'Developpeur Java/Angular',
            },
        ]
    }
    ];

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
                    <ul className='list'>
                        {
                            values.map((arrival) => {
                                const listItems: JSX.Element[] = [];
                                const dateString = moment(arrival.date).format('DD MMMM');
                                listItems.push(<li key={dateString} className='list-header'>
                                    {dateString}
                                </li>);
                                listItems.push(...arrival.users.map((user) => {
                                    user.size = 'medium';
                                    return (<li key={user.firstname + user.lastname}>
                                        <User user={user}></User>
                                    </li>)
                                }));
                                return listItems;
                            })
                        }
                    </ul>
                </div>
            </section>
        </article>
    )
}

export default NewArrivals;
