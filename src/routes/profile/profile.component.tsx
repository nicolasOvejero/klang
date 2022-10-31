import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import defaultFaces from '../../assets/ufo.png';
import RequestError from '../../common/errors/request-error';
import UserService from '../../common/services/user.service';
import Button from '../../components/button/button.component';
import InputForm from '../../components/input-form/input-form.component';
import Toaster from '../../components/toaster/toaster.component';
import { UserModel } from '../../components/user/user.component';
import { selectUserReducer } from '../../store/user/user.selector';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import './profile.style.scss';

const defaultProfileState = {
    image: '',
    firstname: '',
    lastname: '',
    job: '',
    formError: '',
    success: false,
    loading: false
};

const Profile: React.FC = () => {
    const user = useSelector(selectUserReducer);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [profileState, setProfileState] = useState({
        ...defaultProfileState,
        image: user.image || '',
        firstname: user.firstname,
        lastname: user.lastname,
        job: user.job || '',
    });
    const { image, firstname, lastname, job, formError, success, loading
    } = profileState;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfileState({
            ...profileState,
            [name]: value,
            formError: ''
        });
    }

    const updateStore = (updatedProfile: UserModel) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_USER,
            payload: updatedProfile
        });

        setProfileState({
            ...profileState,
            formError: '',
            success: true
        });

        setTimeout(() => {
            setProfileState({
                ...profileState,
                success: false
            });
        }, 2000);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!lastname || !firstname) {
            setProfileState({
                ...profileState,
                formError: t('profile.errors.required')
            });
            return;
        }

        try {
            const updatedProfile = await UserService.udpateUser({
                input: {
                    id: user.id,
                    lastname: lastname.trim(),
                    firstname: firstname.trim(),
                    image: image.trim(),
                    job: job.trim(),
                }
            });

            if (updatedProfile) {
                updateStore(updatedProfile);
            }
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
                setProfileState({
                    ...profileState,
                    formError: t('profile.errors.unknown')
                });
            }
        }
    }

    return (
        <article className='profile'>
            <section className='container'>
                <h2 className='title'>
                    {t('profile.title')}
                </h2>
                <div
                    className={`image ${image !== '' ? '' : 'default'}`}
                    style={{ backgroundImage: `url(${image || defaultFaces})` }}
                ></div>
                <form
                    onSubmit={handleSubmit}
                    className='form'
                >
                    <InputForm
                        label={t('profile.image')}
                        type='text'
                        onChange={handleChange}
                        name='image'
                        value={image}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <InputForm
                        label={t('profile.firstname')}
                        type='text'
                        required
                        onChange={handleChange}
                        name='firstname'
                        value={firstname}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <InputForm
                        label={t('profile.lastname')}
                        type='text'
                        required
                        onChange={handleChange}
                        name='lastname'
                        value={lastname}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <InputForm
                        label={t('profile.job')}
                        type='text'
                        onChange={handleChange}
                        name='job'
                        value={job}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <Button
                        label={t('profile.save')}
                        type='submit'
                        disabled={loading} />
                </form>
            </section>
            <Toaster
                message={t('profile.success')}
                type='success'
                display={success}
            />
        </article>
    )
}

export default Profile;
