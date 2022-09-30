import { Outlet } from 'react-router-dom';
import './birthday-form.style.scss';

function BirthdayForm() {
    return (
        <section className='birthday-form'>
            <Outlet />
        </section>
    )
}

export default BirthdayForm;
