import { EventModel } from "../../../routes/event/event.component";
import Button from "../../button/button.component";
import moment from 'moment';
import User from "../../user/user.component";
import { useNavigate } from "react-router-dom";
import { selectUserReducer } from "../../../store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RequestError from "../../../common/errors/request-error";
import EventService from "../../../common/services/event.service";
import { Trans, useTranslation } from "react-i18next";
import './event-carousel.style.scss';

export type eventCarouselProps = {
    event: EventModel;
    subscriptionClickHandler: (eventId: string, userId: string, callback: () => void) => void;
}

type EventCarouselDefaultState = {
    disableSubscription: boolean;
    success: boolean;
}

const defaultState = {
    disableSubscription: false,
    success: false
} 

function EventCarousel(props: eventCarouselProps) {
    const user = useSelector(selectUserReducer);
    const [state, setState] = useState<EventCarouselDefaultState>(defaultState);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    moment.locale(i18n.language, {
        week: {
            dow: 1
        }
    });
    const event = props.event;

    const checkSubscriptionForMe = async () => {
        try {
            const subscriptionFound = await EventService.findSubscriptionByUserIdAndEventId({
                filter: {
                    and: {
                        userID: {
                            eq: user.id
                        }, 
                        eventID: {
                            eq: event.id
                        }
                    }
                }
            });

            setState({
                ...state,
                disableSubscription: subscriptionFound.length > 0
            });
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    const addUserToEvent = async () => {
        props.subscriptionClickHandler(event.id, user.id, () => {
            checkSubscriptionForMe();
        });
    } 

    useEffect(() => {
        checkSubscriptionForMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='container event-carousel hidden out-right'>
            <div className='content'>
                <div className='event-container'>
                    <div className='image' style={{ backgroundImage: `url(${event.image})` }}>
                        <div className='event-title-container'>
                            <p className='title'>
                                <Trans i18nKey='home.events.title'>
                                </Trans>
                            </p>
                        </div>
                    </div>
                    <div className='event-info-container'>
                        <div className='left-container'>
                            <h3 className='event-title'>{event.type}</h3>
                            <div className='info-container'>
                                <p className='label'>{t('home.events.date')}</p>
                                <p className='value'>{moment(event.date).format('dddd DD MMMM YYYY')}</p>
                                <p className='label'>{t('home.events.hour')}</p>
                                <p className='value'>{event.schedule}</p>
                                <p className='label'>{t('home.events.address')}</p>
                                <p className='value'>{event.address?.street}, {event.address?.city}</p>
                            </div>
                            <Button
                                label={t('home.events.subscribe')}
                                type='button'
                                color='primary'
                                disabled={ state.disableSubscription }
                                clickHandler={ addUserToEvent }
                            ></Button>
                        </div>
                        <div className='right-container'>
                            {
                                event.participants && event.participants.length > 0 && (
                                    <h3 className='event-title'>
                                        {t('home.events.participants')}
                                    </h3>
                                )
                            }
                            <div className='participants'>
                                {
                                    event.participants?.map((user) => {
                                        user['size'] = 'small';
                                        user['background'] = 'bg-grey';
                                        return (
                                            <div key={user.id} className='users-item'>
                                                <User user={user}></User>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                label={t('home.events.button')}
                type='button'
                clickHandler={ () => navigate('events') }
            ></Button>
        </div>
    );
}

export default EventCarousel;
