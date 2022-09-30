import { Outlet } from 'react-router-dom';
import './users-form.style.scss';

function UsersForm() {
    return (
        <section className='users-form'>
            <Outlet />
        </section>
    )
}

export default UsersForm;
