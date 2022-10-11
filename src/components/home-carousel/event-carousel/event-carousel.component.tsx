import { EventModel } from "../../../routes/event/event.component";
import Button from "../../button/button.component";
import moment from 'moment';
import User from "../../user/user.component";
import { useNavigate } from "react-router-dom";
import './event-carousel.style.scss';
import { selectUserReducer } from "../../../store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { subscriptionToEvent, SubscriptionToEventQuery } from "../../custom-queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export type eventCarouselProps = {
    event: EventModel;
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
    const event = props.event;

    const checkSubscriptionForMe = async () => {
        const subscriptionFound = await API.graphql({
            query: subscriptionToEvent,
            variables: {
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
            }
        }) as GraphQLResult<SubscriptionToEventQuery>;

        if (subscriptionFound.errors) {
            console.error(subscriptionFound.errors);
            return;
        }


        if (subscriptionFound.data) {
            setState({
                ...state,
                disableSubscription: subscriptionFound.data.listUsersEvents.items.length > 0
            })
        }
    }

    const subscribeEvent = () => {

    };

    useEffect(() => {
        checkSubscriptionForMe();
    }, []);

    return (
        <div className='container event-carousel'>
            <div className='content'>
                <div className='event-container'>
                    <div className='image' style={{ backgroundImage: `url(${event.image})` }}>
                        <div className='event-title-container'>
                            <p className='title'>
                                Quels est le <br />prochain événement ?
                            </p>
                        </div>
                    </div>
                    <div className='event-info-container'>
                        <div className='left-container'>
                            <h3 className='event-title'>{event.type}</h3>
                            <div className='info-container'>
                                <p className='label'>Date :</p>
                                <p className='value'>{moment(event.date).format('dddd DD MMMM YYYY')}</p>
                                <p className='label'>Heure :</p>
                                <p className='value'>{event.schedule}</p>
                                <p className='label'>Adresse :</p>
                                <p className='value'>{event.address?.street}, {event.address?.city}</p>
                            </div>
                            <Button
                                label="Je m'inscrit"
                                type='button'
                                color='primary'
                                disabled={ state.disableSubscription }
                                clickHandler={ subscribeEvent }
                            ></Button>
                        </div>
                        <div className='right-container'>
                            {
                                event.participants && event.participants.length > 0 && (
                                    <h3 className='event-title'>Les participants</h3>
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
                label="Voir plus d'événements"
                type='button'
                clickHandler={ () => navigate('events') }
            ></Button>
        </div>
    );
}

export default EventCarousel;
