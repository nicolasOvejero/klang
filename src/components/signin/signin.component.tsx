import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import { Auth } from 'aws-amplify';
import './signin.style.scss';
import { useDispatch } from 'react-redux';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';

const defaultFormFields = {
    username: '',
    password: '',
};

function Signin() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, password } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    async function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
        } catch (error) {
            console.log('error signing in', error);
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
                    onChange={handleChange}
                    name='username'
                    value={username}
                />

                <InputForm
                    label='Mot de passe'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <div className='button-container'>
                   <Button label='Connexion' type='submit' />
                </div>
            </form>
        </section>
    );
}

export default Signin;
