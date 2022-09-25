import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import { Auth } from 'aws-amplify';
import './signin.style.scss';
import { useDispatch } from 'react-redux';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { useNavigate } from 'react-router-dom';

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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignInState({
            ...signInState,
            [name]: value,
            formHasError: false,
            formError: ''
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
            dispatch({
                type: AUTH_ACTION_TYPES.SET_AUTH,
                payload: {
                    isConnected: true,
                    user: {
                        username: user.username,
                        mail: user.attributes.email,
                        emailVerified: user.attributes.email_verified,
                        token: user.signInUserSession.accessToken.jwtToken
                    }
                }
            });
            navigate('/');
        } catch (error: any) {
            setSignInState({
                ...signInState,
                formHasError: true,
                formError: "Mot de passe ou utilisateur incorrect", 
                loading: false
            });
        }
    }

    return (
        <section className='signin'>
            <h2 className='title'>Je me connecte</h2>
            <form className='form' onSubmit={signIn}>
                <InputForm
                    label="Nom d'utilisateur"
                    type='text'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='username'
                    value={username}
                />

                <InputForm
                    label='Mot de passe'
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <div className='button-container'>
                   <Button label='Connexion' type='submit' disabled={loading} />
                </div>
            </form>
        </section>
    );
}

export default Signin;
