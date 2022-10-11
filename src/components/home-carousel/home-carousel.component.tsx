import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import { EventModel } from '../../routes/event/event.component';
import { getNextEvents, ListBirthdaysQuery, listBithday, ListEventsQuery, listNewArrivals, ListNewArrivalsQuery } from '../custom-queries';
import moment from 'moment';
import './home-carousel.style.scss';
import EventCarousel from './event-carousel/event-carousel.component';
import { NewArrivalModel } from '../../routes/new-arrivals/new-arrivals.component';
import NewArrivalsCarousel from './new-arrival-carousel/new-arrival-carousel.component';
import BirthdaysCarousel from './birthdays-carousel/birthdays-carousel.component';

function HomeCarousel() {
    const [users, setUsers] = useState<any[]>([]);
    const [event, setEvent] = useState<EventModel>();
    const [newArrival, setNewArrival] = useState<NewArrivalModel[]>([]);
    const [carouselPos, setCarouselPos] = useState(0);
    const [carouselLength, setCarouselLength] = useState(0);
    const viewsContainer = useRef<HTMLDivElement>(null);

    const nextView = () => {
        if (!(viewsContainer.current?.children)) {
            return;
        }

        const children = viewsContainer.current.children;

        children[carouselPos].classList.add('out-left');
        children[carouselPos].classList.remove('current');

        const nextPos = carouselPos >= carouselLength - 1 ? 0 : carouselPos + 1;
        setCarouselPos(nextPos);

        children[nextPos].classList.add('current');

        setTimeout(() => {
            children[carouselPos].classList.add('hidden');
            children[carouselPos].classList.remove('out-left');
            setTimeout(() => {
                children[carouselPos].classList.remove('hidden');
            }, 20);
        }, 700);
    }

    const prevView = () => {
        if (!(viewsContainer.current?.children)) {
            return;
        }

        const children = viewsContainer.current.children;

        children[carouselPos].classList.add('out-right');
        children[carouselPos].classList.remove('current');

        const prevPos = carouselPos - 1 < 0 ? carouselLength - 1 : carouselPos - 1;
        setCarouselPos(prevPos);

        children[prevPos].classList.add('hidden');
        children[prevPos].classList.add('out-left');
        children[prevPos].classList.add('current');

        setTimeout(() => {
            children[prevPos].classList.remove('hidden');

            setTimeout(() => {
                children[carouselPos].classList.remove('out-right');
                children[prevPos].classList.remove('out-left');
            }, 20);
        }, 20);
    }

    const getBirthdays = async () => {
        const currentMonth = moment().format('MM');
        const nextMonth = moment().add(1, 'M').format('MM');

        const firstBirthdays = await API.graphql({
            query: listBithday,
            variables: {
                limit: 6,
                filter: {
                    or: [{
                        date: {
                            contains: `-${currentMonth}-`
                        }
                    },
                    {
                        date: {
                            contains: `-${nextMonth}-`, 
                        },
                    }]
                }
            }
        }) as GraphQLResult<ListBirthdaysQuery>;

        if (firstBirthdays.errors) {

        }

        if (firstBirthdays?.data?.listBirthdays?.items?.length != null) {
            const users = firstBirthdays?.data?.listBirthdays?.items
                .filter((date) => {
                    const mdate = moment(date?.date);
                    return mdate.date() >= moment().date() && mdate.month() >= moment().month();
                })
                .map((date) => {
                    return date?.users?.items?.map((user) => {
                        return {
                            id: user?.id,
                            firstname: user?.firstname,
                            lastname: user?.lastname,
                            image: user?.image,
                            birthday: moment(date?.date).format('DD MMMM'),
                        }
                    }).flat();
                }).flat();
                
            setUsers(users);
        }
    }

    const getNextEvent = async () => {
        const currentDay = moment().format('YYYY-MM-DD');
 
        const nextEvent = await API.graphql({
            query: getNextEvents,
            variables: {
                limit: 1,
                date: {
                    ge: currentDay
                }
            }
        }) as GraphQLResult<ListEventsQuery>;

        if (nextEvent.errors) {

        }

        if (nextEvent?.data?.listEvents?.items != null) {
            const event = nextEvent.data.listEvents.items.map((item) => {
                return {
                    id: item?.id || '',
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
                            id: user?.user.id || '',
                            lastname: user?.user.lastname || '',
                            firstname: user?.user.firstname || '',
                            image: user?.user.image || ''
                        }
                    })
                }
            })
            setEvent(event[0]);
        }
    }

    const getNewArrivals = async () => {
        const currentDay = moment().format('YYYY-MM-DD');
 
        const firstBirthdays = await API.graphql({
            query: listNewArrivals,
            variables: {
                limit: 6,
                filter: {
                    date: {
                        ge: currentDay
                    }
                }
            }
        }) as GraphQLResult<ListNewArrivalsQuery>;

        if (firstBirthdays.errors) {

        }

        if (firstBirthdays?.data?.listNewArrivals?.items != null) {
            const newArrivals = firstBirthdays.data.listNewArrivals.items.map((item) => {
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
                    }) || []
                }
            });
            setNewArrival(newArrivals);
        }
    }

    useEffect(() => {
        getBirthdays();
        getNextEvent();
        getNewArrivals();
    }, []);

    useEffect(() => {
        if (viewsContainer.current?.children.length) {
            setCarouselLength(viewsContainer.current.children.length);
            for (let i = 0; i < viewsContainer.current.children.length; i++) {
                viewsContainer.current.children[i].classList.remove('current')
            }
            viewsContainer.current.children[0].classList.add('current');
        }
    }, [event, users, newArrival]);

    return (
        <section className='carousel-container'>
            <div className='carousel-panel'>
                {
                    carouselLength > 1 && (
                        <span
                            className="navigation-buttons material-symbols-outlined"
                            onClick={prevView}
                        >
                            chevron_left
                        </span>
                    )
                }
                <div className='views' ref={viewsContainer}>
                    {
                        users && users.length > 0 && (<BirthdaysCarousel users={ users } />)
                    }
                    {
                        event && (<EventCarousel event={ event } />)
                    }
                    {
                        newArrival && newArrival.length > 0 && (<NewArrivalsCarousel newArrivals={ newArrival } />)
                    }
                </div>
                {
                    carouselLength > 1 && (
                        <span
                            className="navigation-buttons material-symbols-outlined"
                            onClick={nextView}
                        >
                            chevron_right
                        </span>
                    )
                }
            </div>
        </section>
    );
}

export default HomeCarousel;
