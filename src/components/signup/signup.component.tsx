import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import './signup.style.scss';

const defaultSignUpState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    formError: '',
    formPasswordError: '',
    loading: false
};

const Signup: React.FC = () => {
    const [signUpState, setSignUpState] = useState(defaultSignUpState);
    const { username, email, password, confirmPassword, formError, formPasswordError, loading } = signUpState;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignUpState({
            ...signUpState,
            [name]: value,
            loading: false,
            formError: '',
            formPasswordError: ''
        });
    }

    async function signUp(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (loading || !username || !email || !password || !confirmPassword) {
            return;
        }

        if (password !== confirmPassword) {
            setSignUpState({
                ...signUpState,
                formPasswordError: 'Les mots de passe ne sont pas les mêmes'
            });
            return;
        }

        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
            setSignUpState({
                ...signUpState,
                formPasswordError: 'Mot de passe trop simple'
            });
            return;
        }
    }

    return (
        <section className='signup'>
            <h2 className='title'>Je m'inscrit</h2>
            <form className='form' onSubmit={signUp}>
                <InputForm
                    label="Nom d'utilisateur"
                    type='text'
                    required
                    onChange={handleChange}
                    name='username'
                    value={username}
                    haserror={formError !== ''}
                    errormessage={formError}
                />

                <InputForm
                    label='E-mail'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                    haserror={formError !== ''}
                    errormessage={formError}
                />

                <InputForm
                    label='Mot de passe'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                    haserror={formPasswordError !== '' || formError !== ''}
                    errormessage={formPasswordError || formError}
                />

                <InputForm
                    label='Confirmation mot de passe'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                    haserror={formPasswordError !== '' || formError !== ''}
                    errormessage={formPasswordError || formError}
                />

                <div className='button-container'>
                   <Button label="Inscription" type="submit" disabled={loading} />
                </div>
            </form>
        </section>
    );
}

export default Signup;
