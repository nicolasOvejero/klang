import { Auth } from 'aws-amplify';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Button from '../../components/button/button.component';
import MobileMenu from '../../components/mobile/menu/menu.component';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { USER_INITIAL_STATE } from '../../store/user/user.reducer';
import { selectUserReducer } from '../../store/user/user.selector';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import './navigation.style.scss';

function Navigation() {
    const auth = useSelector(selectAuthReducer);
    const user = useSelector(selectUserReducer);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = auth.user?.groups?.includes('admin') || false;

    async function signOut() {
        try {
            await Auth.signOut();
            dispatch({
                type: AUTH_ACTION_TYPES.SET_AUTH,
                payload: {
                    isConnected: false,
                    user: null
                }
            });
            dispatch({
                type: USER_ACTION_TYPES.SET_USER,
                payload: USER_INITIAL_STATE
            });
        } catch (error) {
            console.error('error signing out: ', error);
        }
    }

    return (
        <Fragment>
            <header className='navigation header'>
                <span
                    className='manu-icon material-symbols-outlined'
                    onClick={() => setMenuOpen(true)}
                >
                    menu
                </span>
                <img
                    onClick={() => navigate('/')}
                    className='logo'
                    alt="logo"
                    src={logo}
                />
                <div className='identity'>
                    <p className='identity-name'>
                        Bonjour, { user.firstname || auth.user?.username }
                    </p>
                    {
                        isAdmin && <Button
                            label='Administration'
                            type='button'
                            clickHandler={() => navigate('/admin')}
                        ></Button>
                    }
                    <Button
                        label='Mon profil'
                        type='button'
                        clickHandler={() => navigate('/profile')}
                    ></Button>
                    <Button
                        label='Déconnexion'
                        type='button'
                        clickHandler={signOut}
                    ></Button>
                </div>
            </header>
            <MobileMenu
                isOpen={menuOpen}
                isAdmin={isAdmin}
                closeMenu={() => setMenuOpen(false)}
                signOut={ () => signOut() }
            />
            <Outlet />
        </Fragment>
    );
}

export default Navigation;
