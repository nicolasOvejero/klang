import { ChangeEvent, useState } from 'react';
import InputForm from '../input-form/input-form.component';
import './signin.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

function Signin() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <section className='signin'>
            <h2 className='title'>Je me connecte</h2>
            <form className='form'>
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
            </form>
        </section>
    );
}

export default Signin;
