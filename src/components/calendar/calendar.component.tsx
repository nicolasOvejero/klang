import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { EventModel } from '../../models/event.model';
import { BirthdayModel } from '../../routes/birthday/birthday.component';
import './calendar.style.scss';

type CalendarPops = {
	iconHover: string;
	color: string;
	selectedDay: any[];
	daySelectedHandler: (day: any) => void;
};

const Calendar: React.FC<CalendarPops> = (props: CalendarPops) => {
	const { i18n } = useTranslation();
	moment.updateLocale(i18n.language, {
		week: {
			dow: 1,
		},
	});

	const month = moment().format('MMMM YYYY');
	const totalDaysInCurrentMonth = moment().daysInMonth();
	const dayLabels = moment.weekdaysShort(true);
	const firstDay: number = +moment().startOf('month').format('d') - 1;

	const days = [];
	for (let i = 0; i < firstDay; i++) {
		days.push(0 - (firstDay - i));
	}
	for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
		days.push(i);
	}

	const isDayMatch = (day: number): BirthdayModel | EventModel | undefined => {
		const date = moment().set('date', day);
		return props.selectedDay.find((v: BirthdayModel | EventModel) => {
			const selectedDate = moment(v.date);
			return selectedDate.date() === date.date() && selectedDate.month() === date.month();
		});
	};

	return (
		<div className={`calendar ${props.color}`}>
			<div className='month-name'>{month}</div>
			{dayLabels.map((dayLabels) => (
				<div
					key={dayLabels}
					className='days-label'
				>
					{dayLabels}
				</div>
			))}
			{days.map((day) => {
				const match = isDayMatch(day);
				return (
					<div
						key={day}
						className='days-tile'
					>
						{day > 0 && (
							<span
								onClick={match ? () => props.daySelectedHandler(match) : undefined}
								className={`${match ? 'selected' : ''}`}
							>
								<span>{day}</span>
								{match && (
									<img
										alt='birth cake'
										src={props.iconHover}
										className='cake-image'
									/>
								)}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Calendar;
