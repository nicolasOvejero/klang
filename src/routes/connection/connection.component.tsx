import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './connection.style.scss';

function Connection() {
    return (
        <article className='connection'>
            <img
                className='logo'
                alt="logo"
                src={logo}
            />
            <section className='forms'>
                <Outlet />
            </section>
        </article>
    );
}

export default Connection;
