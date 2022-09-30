import { Outlet } from 'react-router-dom';
import './new-arrival-form.style.scss';

function NewArrivalForm() {
    return (
        <section className='new-arrival-form'>
            <Outlet />
        </section>
    )
}

export default NewArrivalForm;
