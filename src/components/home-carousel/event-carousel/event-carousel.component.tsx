import Button from '../../button/button.component';
import moment from 'moment';
import User from '../../user/user.component';
import { useNavigate } from 'react-router-dom';
import { selectUserReducer } from '../../../store/user/user.selector';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RequestError from '../../../common/errors/request-error';
import EventService from '../../../common/services/event.service';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as Calendar } from '../../../assets/icons/calendar-days.svg';
import { ReactComponent as Clock } from '../../../assets/icons/clock.svg';
import { ReactComponent as Pin } from '../../../assets/icons/map-pin.svg';
import { ReactComponent as Info } from '../../../assets/icons/info.svg';
import { EventModel } from '../../../models/event.model';
import './event-carousel.style.scss';

export type EventCarouselProps = {
	event: EventModel;
	subscriptionClickHandler: (eventId: string, userId: string, callback: () => void) => void;
};

type EventCarouselDefaultState = {
	disableSubscription: boolean;
	success: boolean;
};

const defaultState = {
	disableSubscription: false,
	success: false,
};

const EventCarousel: React.FC<EventCarouselProps> = (props: EventCarouselProps) => {
	const user = useSelector(selectUserReducer);
	const [state, setState] = useState<EventCarouselDefaultState>(defaultState);
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	moment.updateLocale(i18n.language, {
		week: {
			dow: 1,
		},
	});
	const event = props.event;

	const checkSubscriptionForMe = async () => {
		try {
			const subscriptionFound = await EventService.findSubscriptionByUserIdAndEventId({
				filter: {
					and: {
						userID: {
							eq: user.id,
						},
						eventID: {
							eq: event.id,
						},
					},
				},
			});

			setState({
				...state,
				disableSubscription: subscriptionFound.length > 0,
			});
		} catch (error: unknown) {
			if (error instanceof RequestError) {
				console.error(error.errors);
			}
		}
	};

	const addUserToEvent = async () => {
		props.subscriptionClickHandler(event.id, user.id, () => {
			checkSubscriptionForMe();
		});
	};

	useEffect(() => {
		checkSubscriptionForMe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='container event-carousel hidden out-right'>
			<div className='content'>
				<div className='event-container'>
					<div
						className='image'
						style={{ backgroundImage: `url(${event.image})` }}
					>
						<div className='event-title-container'>
							<p className='title'>
								<Trans i18nKey='home.events.title'></Trans>
							</p>
						</div>
					</div>
					<div className='event-info-container'>
						<div className='left-container'>
							<h3 className='event-title'>{event.type}</h3>
							<div className='info-container'>
								<p className='label'>
									<Calendar className='label-icon' />
									<span>{t('home.events.date')}</span>
								</p>
								<p className='value'>{moment(event.date).format('dddd DD MMMM YYYY')}</p>
								<p className='label'>
									<Clock className='label-icon' />
									<span>{t('home.events.hour')}</span>
								</p>
								<p className='value'>{event.schedule}</p>
								<p className='label'>
									<Pin className='label-icon' />
									<span>{t('home.events.address')}</span>
								</p>
								<p className='value'>
									{event.address?.street}, {event.address?.city}
								</p>
							</div>
							{event.description && (
								<div className='description-container'>
									<p className='label'>
										<Info className='label-icon' />
										<span>{t('home.events.description')}</span>
									</p>
									<p className='value'>{event.description}</p>
								</div>
							)}
							<Button
								label={t('home.events.subscribe')}
								type='button'
								color='primary'
								disabled={state.disableSubscription}
								clickHandler={addUserToEvent}
							></Button>
						</div>
						<div className='right-container'>
							<h3 className='event-title'>{t('home.events.participants')}</h3>
							{!!event.participants?.length && (
								<div className='participants'>
									{event.participants?.map((user) => {
										user['size'] = 'small';
										user['background'] = 'bg-grey';
										return (
											<div
												key={user.id}
												className='users-item'
											>
												<User user={user}></User>
											</div>
										);
									})}
								</div>
							)}
							{!event.participants?.length && <p className='no-participant'>{t('home.events.no-participants')}</p>}
						</div>
					</div>
				</div>
			</div>
			<Button
				label={t('home.events.button')}
				type='button'
				clickHandler={() => navigate('events')}
			></Button>
		</div>
	);
};

export default EventCarousel;
