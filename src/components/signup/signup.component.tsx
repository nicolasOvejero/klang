import { ChangeEvent, useState } from 'react';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import './signup.style.scss';

const defaultSignUpState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

function Signup() {
    const [signUpState, setSignUpState] = useState(defaultSignUpState);
    const { username, email, password, confirmPassword } = signUpState;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignUpState({ ...signUpState, [name]: value });
    }

    return (
        <section className='signup'>
            <h2 className='title'>Je m'inscrit</h2>
            <form className='form'>
                <InputForm
                    label="Nom d'utilisateur"
                    type='text'
                    required
                    onChange={handleChange}
                    name='username'
                    value={username}
                />

                <InputForm
                    label='E-mail'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <InputForm
                    label='Mot de passe'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <InputForm
                    label='Confirmation mot de passe'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <div className='button-container'>
                   <Button label="Inscription" type="submit" />
                </div>
            </form>
        </section>
    );
}

export default Signup;
