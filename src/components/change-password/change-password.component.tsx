import { Auth } from 'aws-amplify';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import { UserModel } from '../user/user.component';
import RequestService from '../../common/services/new-arrivals.service';
import RequestError from '../../common/errors/request-error';
import './change-password.style.scss';
import UserService from '../../common/services/user.service';

const defaultResetState = {
    password: '',
    confirmPassword: '',
    formHasError: false,
    formError: '',
    loading: false
};

function ChangePassword() {
    const [resetState, setResetState] = useState(defaultResetState);
    const { password, confirmPassword, formHasError, formError, loading } = resetState;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(selectAuthReducer);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setResetState({
            ...resetState,
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

    function validPassword(): boolean {
        if (loading || !password || !confirmPassword) {
            return false;
        }

        if (password !== confirmPassword) {
            console.error('Password mismatch');
            setResetState({
                ...resetState,
                formHasError: true,
                formError: "Mots de passe non identiques", 
                loading: false
            });
            return false;
        }

        return true;
    }

    async function changePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validPassword()) {
            return;
        }

        completeNewPassword();
    }

    async function completeNewPassword() {
        try {
            const user = await Auth.completeNewPassword(
                auth.tempUser,
                password
            );
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
                        sub: user.signInUserSession.idToken.sub,
                    }
                }
            });
            await getUserProfile(
                user.signInUserSession.idToken.payload.email,
                user.signInUserSession.idToken.payload.family_name,
                user.signInUserSession.idToken.payload.given_name,
            );
       } catch (error) {
            console.error(error);
            setResetState({
                ...resetState,
                formHasError: true,
                formError: 'Impossible de mettre à jour le mot de passe'
            });
        }
    }

    return (
        <section className='change-password'>
            <h2 className='title'>Changement de mot de passe</h2>
            <form className='form' onSubmit={changePassword}>
                <InputForm
                    label='Nouveau mot de passe'
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <InputForm
                    label="Confirmation mot de passe"
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <div className='button-container'>
                   <Button label='Connexion' type='submit' disabled={loading} />
                </div>
            </form>
        </section>
    )
}

export default ChangePassword;
