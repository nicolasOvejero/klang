import Calendar from '../../components/calendar/calendar.component';
import partyImage from '../../assets/party.png';
import cake from '../../assets/cake.png';
import moment from 'moment';
import { useState } from 'react';
import { ReactComponent as Background } from '../../assets/bg-party.svg';
import User from '../../components/user/user.component';
import Loader from '../../components/loader/loader.component';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { BirthdayModel } from '../../models/birthday.model';
import { useGetBirthdays } from '../../hooks/useGetBirthdays';
import './birthday.style.scss';

const Birthday: React.FC = () => {
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<BirthdayModel>();
	const { t } = useTranslation();
	const currentMonth = moment().format('MM');
	const { birthdays, isLoading } = useGetBirthdays({
		filter: {
			date: {
				contains: `-${currentMonth}-`,
			},
		},
	});

	const showEventDescription = (selectedDay: BirthdayModel) => {
		setIsInfoOpen(true);
		setSelectedDate(selectedDay);
	};

	const handleClose = () => {
		setIsInfoOpen(false);
	};

	return (
		<article className='body birthdays'>
			<section className='title-container'>
				<h1 className='title'>{t('birthdays.title')}</h1>
			</section>
			<section className='birthday-container'>
				{!isLoading && (
					<Calendar
						iconHover={cake}
						color='primary'
						daySelectedHandler={showEventDescription}
						selectedDay={birthdays}
					/>
				)}
				{isLoading && (
					<div className='calendar-position'>
						<Loader></Loader>
					</div>
				)}
				<div className='birthday-image'>
					<img
						alt='party for birthday'
						src={partyImage}
					/>
				</div>
				<aside className={`birthday-informations ${isInfoOpen ? 'open' : ''}`}>
					<Close
						className='close'
						onClick={handleClose}
					/>
					<Background className='background' />
					<h3 className='date'>{moment(selectedDate?.date).format('DD MMMM')}</h3>
					<div className='users'>
						{selectedDate?.users?.map((user) => {
							user.showActions = true;
							user.background = 'bg-white';
							return (
								<User
									key={user.id}
									user={user}
								></User>
							);
						})}
					</div>
				</aside>
			</section>
		</article>
	);
};

export default Birthday;
