import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './menu.style.scss';

type MobileMenuProps = {
    isOpen: boolean;
    isAdmin: boolean;
    closeMenu: () => void;
    signOut: () => void;
}

function MobileMenu(props: MobileMenuProps) {
    return (
        <div className={ `mobile-menu ${props.isOpen ? 'open' : ''}` }>
            <span
                className='close material-symbols-outlined'
                onClick={props.closeMenu}
            >
                close
            </span>
            <div className='logo-container'>
                <img
                    className='logo'
                    alt="logo"
                    src={logo}
                />
            </div>
            <Link
                className='item primary'
                to='birthdays'
                onClick={props.closeMenu}
            >
                Anniversaires
            </Link>
            <hr className='separator light' />
            <Link
                className='item secondary'
                to='events'
                onClick={props.closeMenu}
            >
                Événements
            </Link>
            <hr className='separator light' />
            <Link
                className='item primary'
                to='new-arrivals'
                onClick={props.closeMenu}
            >
                Nouveaux arrivants
            </Link>
            <hr className='separator' />
            <Link
                className='item'
                to='profile'
                onClick={props.closeMenu}
            >
                Mon profil
            </Link>
            {
                props.isAdmin && (
                    <Fragment>
                        <hr className='separator light' />
                        <Link
                            className='item'
                            to='admin'
                            onClick={props.closeMenu}
                        >
                            Administration
                        </Link>
                    </Fragment>
                )
            }
            <hr className='separator light' />
            <Link
                className='item'
                to='login'
                onClick={props.signOut}
            >
                Logout
            </Link>
        </div>
    );
}

export default MobileMenu;
