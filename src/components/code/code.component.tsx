import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthReducer } from "../../store/auth/auth.selector";
import { AUTH_ACTION_TYPES } from "../../store/auth/auth.types";
import Button from "../button/button.component";
import InputForm from "../input-form/input-form.component";
import { ReactComponent as Send } from '../../assets/icons/send.svg';
import './code.style.scss';

const defaultCodeState = {
    code: '',
    formError: '',
    loading: false
};

const Code: React.FC = () => {
    const auth = useSelector(selectAuthReducer);
    const [codeState, setCodeState] = useState(defaultCodeState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { code, formError, loading } = codeState;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCodeState({
            ...codeState,
            [name]: value,
            formError: ''
        });
    }

    const sendCode = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setCodeState({
            ...codeState,
            loading: true
        });

        if (loading || !code) {
            return;
        }

        dispatch({
            type: AUTH_ACTION_TYPES.SET_TEMP_AUTH,
            payload: {
                isConnected: false,
                tempUser: {
                    ...auth.tempUser,
                    code
                }
            }
        });
        navigate('/change-password');
    }
        
    return (
        <section className='code'>
            <form className='form' onSubmit={sendCode}>
                <InputForm
                    label={t('login.code')}
                    type='text'
                    required
                    haserror={formError !== ''}
                    errormessage={formError}
                    onChange={handleChange}
                    name='code'
                    value={code}
                    icon={Send}
                />

                <div className='button-container'>
                    <Button
                        label={t('login.next')}
                        type='submit'
                        disabled={loading}
                    />
                </div>
            </form>
        </section>
    )
}

export default Code;
