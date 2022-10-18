import { Fragment, useEffect, useRef, useState } from 'react';
import { EventModel } from '../../routes/event/event.component';
import moment from 'moment';
import EventCarousel from './event-carousel/event-carousel.component';
import { NewArrivalModel } from '../../routes/new-arrivals/new-arrivals.component';
import NewArrivalsCarousel from './new-arrival-carousel/new-arrival-carousel.component';
import BirthdaysCarousel from './birthdays-carousel/birthdays-carousel.component';
import Loader from '../loader/loader.component';
import RequestError from '../../common/errors/request-error';
import UserService from '../../common/services/user.service';
import EventService from '../../common/services/event.service';
import NewArrivalsService from '../../common/services/new-arrivals.service';
import BirthdayService from '../../common/services/birthday.service';
import { ReactComponent as ChevRight } from '../../assets/icons/chevron-right.svg';
import { ReactComponent as ChevLeft } from '../../assets/icons/chevron-left.svg';
import './home-carousel.style.scss';

function HomeCarousel() {
    const [users, setUsers] = useState<any[]>([]);
    const [event, setEvent] = useState<EventModel>();
    const [newArrival, setNewArrival] = useState<NewArrivalModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
        children[nextPos].classList.remove('hidden');

        setTimeout(() => {
            children[nextPos].classList.remove('out-right');
        }, 50);

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

        try {
            const birthdays = await BirthdayService.getBirthdays({
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
            });

            setUsers(
                birthdays
                    .filter((date) => {
                        const mdate = moment(date?.date);
                        return mdate.date() >= moment().date() && mdate.month() >= moment().month();
                    })
                    .flatMap((b) =>
                        b.users?.map((u) => {
                            u.birthday = moment(b.date).format('DD MMMM')
                            return u
                        })
                            .flat()
                    )
                    .sort((a, b) => moment(a?.birthday).diff(moment(b?.birthday)))
            );

            getNextEvent();
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    const getNextEvent = async () => {
        const currentDay = moment().format('YYYY-MM-DD');

        try {
            const nextEvent = await EventService.getNextEvent({
                limit: 1,
                date: {
                    ge: currentDay
                }
            });

            setEvent(nextEvent);

            getNewArrivals();

        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    const getNewArrivals = async () => {
        const currentDay = moment().format('YYYY-MM-DD');
 
        try {
            const newArrivals = await NewArrivalsService.getNewArrivals({
                limit: 6,
                filter: {
                    date: {
                        ge: currentDay
                    }
                }
            });

            setNewArrival(newArrivals);
            setIsLoading(false);
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        } finally {
            setTimeout(() => {
                if (viewsContainer.current?.children.length) {
                    setCarouselLength(viewsContainer.current.children.length);
                    viewsContainer.current.children[0].classList.add('current');
                    viewsContainer.current.children[0].classList.remove('hidden');
                    viewsContainer.current.children[0].classList.remove('out-right');
                }
            }, 20);
        }
    }

    const subscribeEvent = async (eventId: string, userId: string, callback: () => void) => {
        try {
            const subscription = await UserService.createUsersEvents({
                input: {
                    eventID: eventId, 
                    userID: userId
                }
            });

            if (event && subscription) {
                event.participants?.push(
                    {
                        id: subscription.user.id,
                        lastname: subscription.user.lastname,
                        firstname: subscription.user.firstname,
                        image: subscription.user.image
                    }
                );

                setEvent({
                    ...event
                });
                callback();
            }
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    };

    useEffect(() => {
        getBirthdays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className='carousel-container'>
            <div className='carousel-panel'>
                {
                    isLoading && (
                        <Loader size='big' />
                    )
                }
                {
                    !isLoading && (
                        <Fragment>
                            {
                                carouselLength > 1 && (
                                    <ChevLeft
                                        className='navigation-buttons'
                                        onClick={prevView}
                                    />
                                )
                            }
                            <div className='views' ref={viewsContainer}>
                                {
                                    users && users.length > 0 && (<BirthdaysCarousel users={ users } />)
                                }
                                {
                                    event && (<EventCarousel event={ event } subscriptionClickHandler={subscribeEvent} />)
                                }
                                {
                                    newArrival && newArrival.length > 0 && (<NewArrivalsCarousel newArrivals={ newArrival } />)
                                }
                            </div>
                            {
                                carouselLength > 1 && (
                                    <ChevRight
                                        className='navigation-buttons'
                                        onClick={nextView}
                                    />
                                )
                            }
                        </Fragment>
                    )
                }
            </div>
        </section>
    );
}

export default HomeCarousel;
