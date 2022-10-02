import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { UpdateUserMutation } from '../../API';
import defaultFaces from '../../assets/ufo.png';
import Button from '../../components/button/button.component';
import InputForm from '../../components/input-form/input-form.component';
import Toaster from '../../components/toaster/toaster.component';
import { updateUser } from '../../graphql/mutations';
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

    const updateStore = (updatedProfile: UpdateUserMutation) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_USER,
            payload: {
                id: updatedProfile.updateUser?.id || '',
                email: updatedProfile.updateUser?.mail || '',
                firstname: updatedProfile.updateUser?.firstname,
                lastname: updatedProfile.updateUser?.lastname || '',
                image: updatedProfile.updateUser?.image || '',
                job: updatedProfile.updateUser?.job || ''
            }
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

        const updatedProfile = await API.graphql({
            query: updateUser,
            variables: {
                input: {
                    id: user.id,
                    lastname: lastname.trim(),
                    firstname: firstname.trim(),
                    image: image.trim(),
                    job: job.trim(),
                }
            }
        }) as GraphQLResult<UpdateUserMutation>;

        if (updatedProfile.errors) {
            console.log(updatedProfile.errors);
            setProfileState({
                ...profileState,
                formError: "Enregistrement impossible"
            });
            return;
        }

        if (updatedProfile.data) {
            updateStore(updatedProfile.data);
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
