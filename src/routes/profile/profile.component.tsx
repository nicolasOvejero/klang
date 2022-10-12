import { ChangeEvent, FormEvent, useState } from 'react';
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

function Profile() {
    const user = useSelector(selectUserReducer);
    const dispatch = useDispatch();
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
                formError: "Le prénom et nom de famille sont obligatoire"
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
                    formError: "Enregistrement impossible"
                });
            }
        }
    }

    return (
        <article className='profile'>
            <section className='container'>
                <h2 className='title'>Mon profil</h2>
                <div
                    className={`image ${image !== '' ? '' : 'default'}`}
                    style={{ backgroundImage: `url(${image || defaultFaces})` }}
                ></div>
                <form
                    onSubmit={handleSubmit}
                    className='form'
                >
                    <InputForm
                        label="Image URL"
                        type='text'
                        onChange={handleChange}
                        name='image'
                        value={image}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <InputForm
                        label="Prénom"
                        type='text'
                        required
                        onChange={handleChange}
                        name='firstname'
                        value={firstname}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <InputForm
                        label="Nom de famille"
                        type='text'
                        required
                        onChange={handleChange}
                        name='lastname'
                        value={lastname}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <InputForm
                        label="Travail"
                        type='text'
                        onChange={handleChange}
                        name='job'
                        value={job}
                        haserror={formError !== ''}
                        errormessage={formError}
                    />
                    <Button
                        label='Enregistrer'
                        type='submit'
                        disabled={loading} />
                </form>
            </section>
            <Toaster
                message="Votre profil a bien été mis à jour"
                type='success'
                display={success}
            />
        </article>
    )
}

export default Profile;
