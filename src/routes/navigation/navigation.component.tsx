import { Auth } from 'aws-amplify';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Button from '../../components/button/button.component';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import './navigation.style.scss';

function Navigation() {
    const auth = useSelector(selectAuthReducer);
    const dispatch = useDispatch();

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
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <Fragment>
            <header className='header'>
                <img
                    className='logo'
                    alt="logo"
                    src={logo}
                />
                <div className='identity'>
                    <p className='identity-name'>
                        Bonjour, { auth.user?.username }
                    </p>
                    <Button
                        label='Déconnexion'
                        type='button'
                        clickHandler={signOut}
                    ></Button>
                </div>
            </header>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;
