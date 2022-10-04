import { Auth } from "aws-amplify";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_ACTION_TYPES } from "../../store/auth/auth.types";
import Button from "../button/button.component";
import InputForm from "../input-form/input-form.component";
import './first-time.style.scss';

const defaultFirstTimeState = {
    username: '',
    formError: '',
    loading: false
};

function FirstTime() {
    const [firstTimeState, setFirstTimeState] = useState(defaultFirstTimeState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username, formError, loading } = firstTimeState;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFirstTimeState({
            ...firstTimeState,
            [name]: value,
            formError: ''
        });
    }

    const sendCode = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFirstTimeState({
            ...firstTimeState,
            loading: true
        });

        if (loading || !username) {
            return;
        }

        try {
            await Auth.forgotPassword(username);
            dispatch({
                type: AUTH_ACTION_TYPES.SET_TEMP_AUTH,
                payload: {
                    isConnected: false,
                    tempUser: {
                        username
                    }
                }
            });
            navigate('/code');
        } catch (error: any) {
            console.error(error);
            setFirstTimeState({
                ...firstTimeState,
                formError: 'Une erreur est survenue',
                loading: false
            });
        }
    }
        
    return (
        <section className='first-time'>
            <form className='form' onSubmit={sendCode}>
                <InputForm
                    label="Nom d'utilisateur"
                    type='text'
                    required
                    haserror={formError !== ''}
                    errormessage={formError}
                    onChange={handleChange}
                    name='username'
                    value={username}
                />

                <div className='button-container'>
                   <Button label='Suivant' type='submit' disabled={loading} />
                </div>
            </form>
        </section>
    )
}

export default FirstTime;
