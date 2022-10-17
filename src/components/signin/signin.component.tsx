import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { Link, useNavigate } from 'react-router-dom';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import { UserModel } from '../user/user.component';
import RequestError from '../../common/errors/request-error';
import UserService from '../../common/services/user.service';
import { useTranslation } from 'react-i18next';
import './signin.style.scss';

const defaultSignInState = {
    username: '',
    password: '',
    formHasError: false,
    formError: '',
    loading: false
};

function Signin() {
    const [signInState, setSignInState] = useState(defaultSignInState);
    const { username, password, formHasError, formError, loading } = signInState;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignInState({
            ...signInState,
            [name]: value,
            formHasError: false,
            formError: ''
        });
    }

    const getUserProfile = async (
        email: string,
        lastname: string,
        firstname: string
    ) => {
        try {
            const existingProfiles = await UserService.getUsers({
                filter: {
                    mail: {
                        eq: email
                    }
                }
            })

            if (existingProfiles.length > 0) {
                disptachUser(existingProfiles[0]);
                navigate('/');
            } else {
                const newProfile = await UserService.creatUser({
                    input: {
                        mail: email,
                        firstname: firstname,
                        lastname: lastname
                    }
                });

                if (newProfile) {
                    disptachUser(newProfile);
                    navigate('/profile');
                }
            }
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    function disptachUser(user: UserModel) {
        dispatch({
            type: USER_ACTION_TYPES.SET_USER,
            payload: user
        });
    }

    async function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (loading || !username || !password) {
            return;
        }

        setSignInState({
            ...signInState,
            loading: true
        });

        try {
            const user = await Auth.signIn(username, password);
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                 dispatch({
                    type: AUTH_ACTION_TYPES.SET_TEMP_AUTH,
                    payload: {
                        isConnected: false,
                        user: {
                            username: user.username,
                            mail: user.challengeParam.userAttributes.email,
                            emailVerified: user.challengeParam.userAttributes.email_verified,
                        },
                        tempUser: user
                    }
                });
                navigate('/change-password');
                return;
            }
            dispatch({
                type: AUTH_ACTION_TYPES.SET_AUTH,
                payload: {
                    isConnected: true,
                    user: {
                        username: user.signInUserSession.idToken.payload['cognito:username'],
                        mail: user.signInUserSession.idToken.payload.email,
                        emailVerified: user.signInUserSession.idToken.payload.email_verified,
                        token: user.signInUserSession.idToken.jwtToken,
                        groups: user.signInUserSession.idToken.payload['cognito:groups'],
                        sub: user.signInUserSession.idToken.payload.sub,
                    }
                }
            });
            await getUserProfile(
                user.signInUserSession.idToken.payload.email,
                user.signInUserSession.idToken.payload.family_name,
                user.signInUserSession.idToken.payload.given_name,
            );
        } catch (error: any) {
            if (error.message === 'Password reset required for the user') {
                 dispatch({
                    type: AUTH_ACTION_TYPES.SET_TEMP_AUTH,
                    payload: {
                        isConnected: false,
                        user: {
                            username: username,
                        },
                    }
                });
                navigate('/first-time');
                return;
            }
            
            setSignInState({
                ...signInState,
                formHasError: true,
                formError: t('login.errors.wrongPasswordOrUsername'),
                loading: false
            });
        }
    }

    return (
        <section className='signin'>
            <h2 className='title'>{ t('login.title') }</h2>
            <form className='form' onSubmit={signIn}>
                <InputForm
                    label={t('login.username')}
                    type='text'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='username'
                    value={username}
                />

                <InputForm
                    label={t('login.password')}
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='password'
                    value={password}
                    autoComplete='on'
                />

                <Link to='/first-time' className='first-time'>
                    {t('login.first')}
                </Link>

                <div className='button-container'>
                    <Button
                        label={t('login.connection')}
                        type='submit'
                        disabled={loading} />
                </div>
            </form>
        </section>
    );
}

export default Signin;
