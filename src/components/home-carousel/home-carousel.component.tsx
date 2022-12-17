import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import EventCarousel from './event-carousel/event-carousel.component';
import NewArrivalsCarousel from './new-arrival-carousel/new-arrival-carousel.component';
import BirthdaysCarousel from './birthdays-carousel/birthdays-carousel.component';
import Loader from '../loader/loader.component';
import RequestError from '../../common/errors/request-error';
import UserService from '../../common/services/user.service';
import { ReactComponent as ChevRight } from '../../assets/icons/chevron-right.svg';
import { ReactComponent as ChevLeft } from '../../assets/icons/chevron-left.svg';
import { useGetUserBirthdays } from '../../hooks/useGetUserBirthdays';
import { useGetNextEvent } from '../../hooks/useGetNextEvent';
import { useGetNewArrivals } from '../../hooks/useGetNewArrivals';
import './home-carousel.style.scss';

const HomeCarousel: React.FC = () => {
	const [carouselPos, setCarouselPos] = useState(0);
	const [carouselLength, setCarouselLength] = useState(0);
	const viewsContainer = useRef<HTMLDivElement>(null);

	const currentDay = moment().format('YYYY-MM-DD');
	const currentMonth = moment().format('MM');
	const nextMonth = moment().add(1, 'M').format('MM');
	const startWeek = moment().startOf('week').format('YYYY-MM-DD');
	const { userBirthdays, isLoading: isLoadingUser } = useGetUserBirthdays({
		limit: 6,
		filter: {
			or: [
				{
					date: {
						contains: `-${currentMonth}-`,
					},
				},
				{
					date: {
						contains: `-${nextMonth}-`,
					},
				},
			],
		},
	});
	const { event, isLoading: isLoadingEvent } = useGetNextEvent({
		filter: {
			published: {
				eq: true,
			},
			date: {
				ge: currentDay,
			},
		},
	});
	const { newArrivals, isLoading: isLoadingNewArrivals } = useGetNewArrivals({
		limit: 6,
		filter: {
			date: {
				ge: startWeek,
			},
		},
	});

	const isLoading = isLoadingUser || isLoadingEvent || isLoadingNewArrivals;

	const nextView = () => {
		if (!viewsContainer.current?.children) {
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
	};

	const prevView = () => {
		if (!viewsContainer.current?.children) {
			return;
		}

		const children = viewsContainer.current.children;

		children[carouselPos].classList.add('out-right');
		children[carouselPos].classList.remove('current');

		console.log(carouselPos, carouselLength);
		const prevPos = carouselPos - 1 < 0 ? carouselLength - 1 : carouselPos - 1;
		setCarouselPos(prevPos);
		console.log(prevPos);

		children[prevPos].classList.add('hidden');
		children[prevPos].classList.add('out-left');
		children[prevPos].classList.remove('out-right');
		children[prevPos].classList.add('current');

		setTimeout(() => {
			children[prevPos].classList.remove('hidden');

			setTimeout(() => {
				children[carouselPos].classList.remove('out-right');
				children[prevPos].classList.remove('out-left');
			}, 20);
		}, 20);
	};

	const subscribeEvent = async (eventId: string, userId: string, callback: () => void) => {
		try {
			const subscription = await UserService.createUsersEvents({
				input: {
					eventID: eventId,
					userID: userId,
				},
			});

			if (event && subscription) {
				event.participants?.push({
					id: subscription.user.id,
					lastname: subscription.user.lastname,
					firstname: subscription.user.firstname,
					image: subscription.user.image,
				});

				/*
 				setEvent({
					...event,
				});
				*/
				callback();
			}
		} catch (error: unknown) {
			if (error instanceof RequestError) {
				console.error(error.errors);
			}
		}
	};

	useEffect(() => {
		if (viewsContainer.current?.children.length) {
			setCarouselLength(viewsContainer.current.children.length);
			viewsContainer.current.children[0].classList.add('current');
			viewsContainer.current.children[0].classList.remove('hidden');
			viewsContainer.current.children[0].classList.remove('out-right');
		}
	}, [isLoading]);

	return (
		<section className='carousel-container'>
			<div className='carousel-panel'>
				{isLoading && <Loader size='big' />}
				{!isLoading && (
					<>
						{carouselLength > 1 && (
							<ChevLeft
								className='navigation-buttons'
								onClick={prevView}
							/>
						)}
						<div
							className='views'
							ref={viewsContainer}
						>
							{userBirthdays && userBirthdays.length > 0 && <BirthdaysCarousel users={userBirthdays} />}
							{event && (
								<EventCarousel
									event={event}
									subscriptionClickHandler={subscribeEvent}
								/>
							)}
							{newArrivals && newArrivals.length > 0 && <NewArrivalsCarousel newArrivals={newArrivals} />}
						</div>
						{carouselLength > 1 && (
							<ChevRight
								className='navigation-buttons'
								onClick={nextView}
							/>
						)}
					</>
				)}
			</div>
		</section>
	);
};

export default HomeCarousel;
