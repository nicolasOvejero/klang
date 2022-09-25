import Calendar from "../calendar/calendar.component";
import partyImage from '../../assets/party.png';
import cake from '../../assets/cake.png';
import './birthday.style.scss';

function Birthday() {
    return (
        <section className='birthday-container'>
            <Calendar iconHover={cake}/>
            <div className='birthday-image'>
                <img
                    alt="party for birthday"
                    src={partyImage}
                />
            </div>
        </section>
    )
}

export default Birthday;
