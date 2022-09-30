import { Outlet } from 'react-router-dom';
import './event-form.style.scss';

function EventForm() {
    return (
        <section className='event-form'>
            <Outlet />
        </section>
    )
}

export default EventForm;
