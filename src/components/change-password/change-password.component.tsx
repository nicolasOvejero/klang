import { Auth } from 'aws-amplify';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import './change-password.style.scss';

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

    async function changePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (loading || !password || !confirmPassword) {
            return;
        }

        if (password !== confirmPassword) {
            setResetState({
                ...resetState,
                formHasError: true,
                formError: "Mots de passe non identiques", 
                loading: false
            });
            return;
        }

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
            navigate('/');
        } catch (error) {
            // TODO
            console.log(error);
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
