import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './connection.style.scss';

const Connection: React.FC = () => {
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
