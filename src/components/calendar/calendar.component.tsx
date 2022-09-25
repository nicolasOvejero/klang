import './calendar.style.scss';
import moment from 'moment';
import 'moment/locale/fr';

type ClanedarPops = {
    iconHover: string;
}

function Calendar(props: ClanedarPops) {
    moment.locale('fr');
    const month = moment().format('MMMM YYYY');
    const totalDaysInCurrentMonth = moment().daysInMonth();
    const dayLabels = moment.weekdaysShort(true);
    const firstDay: number = +(moment()
                 .startOf("month")
                 .format("d")) - 1; 

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(0 - (firstDay - i));
    }
    for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
        days.push(i);
    }

    const prop = [
        moment().subtract(12, 'day').toDate(),
        moment().subtract(10, 'day').toDate(),
        moment().subtract(15, 'day').toDate(),
        moment().subtract(1, 'day').toDate(),
        moment().add(2, 'day').toDate(),
    ];

    const isDayMatch = (day: number): boolean => {
        const date = moment().set("date", day);
        return prop.find((v) => {
            return moment(v).isSame(date, 'day');
        }) !== undefined;
    }
    
    return (
        <div className='calendar'>
            <div className='month-name'>
                { month }
            </div>
            {
                dayLabels.map((dayLabels) =>
                    (<div key={dayLabels} className='days-label'>{dayLabels}</div>)
                )
            }
            {
                days.map((day) =>
                (
                    <div key={day} className='days-tile'> 
                        {
                            day > 0 && (
                                <span className={`${isDayMatch(day) ? 'selected' : ''}`} >
                                    <span>{day}</span>
                                    {
                                        isDayMatch(day) && <img alt='birth cake'
                                            src={props.iconHover}
                                            className='cake-image' />
                                    }
                                </span>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Calendar;
