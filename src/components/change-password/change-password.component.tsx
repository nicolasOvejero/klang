import { API, Auth } from 'aws-amplify';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateUserMutation, ListUsersQuery } from '../../API';
import { createUser } from '../../graphql/mutations';
import { listUsers } from '../../graphql/queries';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import { UserModel } from '../user/user.component';
import { GraphQLResult } from "@aws-amplify/api";
import './change-password.style.scss';

const defaultResetState = {
    code: '',
    password: '',
    confirmPassword: '',
    formHasError: false,
    formError: '',
    loading: false
};

function ChangePassword() {
    const [resetState, setResetState] = useState(defaultResetState);
    const { code, password, confirmPassword, formHasError, formError, loading } = resetState;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(selectAuthReducer);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setResetState({
            ...resetState,
            [name]: value,
            formHasError: false,
            formError: ''
        });
    }

    const getUserProfile = async (
        email: string,
        lastname: string,
        firstname: string
    ) => {
        const existingProfile = await API.graphql({
            query: listUsers,
            variables: {
                filter: {
                    mail: {
                        eq: email
                    }
                }
            }
        }) as GraphQLResult<ListUsersQuery>;

        const user = existingProfile.data?.listUsers?.items[0];

        if (user) {
            disptachUser({
                id: user.id,
                email: user.mail,
                firstname: user.firstname,
                lastname: user.lastname || '',
                image: user.image || '',
                job: user.job || ''
            })
            navigate('/');
        } else {
            const createdUser = await API.graphql({
                query: createUser,
                variables: {
                    input: {
                        mail: email, 
                        firstname: firstname,
                        lastname: lastname
                    }
                }
            }) as GraphQLResult<CreateUserMutation>;

            const user = createdUser.data?.createUser;
            if (user) {
                disptachUser({
                    id: user.id,
                    email: user.mail,
                    firstname: user.firstname,
                    lastname: user.lastname || '',
                    image: user.image || '',
                    job: user.job || ''
                });
                navigate('/profile');
            }
        }
    }

    function disptachUser(user: UserModel & { email: string | undefined }) {
        dispatch({
            type: USER_ACTION_TYPES.SET_USER,
            payload: user
        });
    }

    function validPassword(): boolean {
        if (loading || !password || !confirmPassword) {
            return false;
        }

        if (password !== confirmPassword) {
            console.error('Password mismatch');
            setResetState({
                ...resetState,
                formHasError: true,
                formError: "Mots de passe non identiques", 
                loading: false
            });
            return false;
        }

        return true;
    }

    async function changePassword(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validPassword()) {
            return;
        }

        if (auth?.tempUser?.code && auth?.tempUser?.username) {
            resetPassword();
        } else {
            completeNewPassword();
        }
    }

    async function resetPassword() {
        if (auth.tempUser) {
            await Auth.forgotPasswordSubmit(auth.tempUser?.username, auth.tempUser?.code, password);
            navigate('/login');
        }
    }

    async function completeNewPassword() {
        try {
            const user = await Auth.completeNewPassword(
                auth.tempUser,
                password
            );
            dispatch({
                type: AUTH_ACTION_TYPES.SET_AUTH,
                payload: {
                    isConnected: true,
                    user: {
                        username: user.signInUserSession.idToken.payload['cognito:username'],
                        mail: user.signInUserSession.idToken.payload.email,
                        emailVerified: user.signInUserSession.idToken.payload.email_verified,
                        token: user.signInUserSession.idToken.jwtToken,
                        groups: user.signInUserSession.idToken.payload['cognito:groups'],
                        sub: user.signInUserSession.idToken.sub,
                    }
                }
            });
            await getUserProfile(
                user.signInUserSession.idToken.payload.email,
                user.signInUserSession.idToken.payload.family_name,
                user.signInUserSession.idToken.payload.given_name,
            );
       } catch (error) {
            console.error(error);
            setResetState({
                ...resetState,
                formHasError: true,
                formError: 'Impossible de mettre à jour le mot de passe'
            });
        }
    }

    return (
        <section className='change-password'>
            <h2 className='title'>Changement de mot de passe</h2>
            <form className='form' onSubmit={changePassword}>
                {
                    !(auth?.tempUser) && (
                        <InputForm
                            label='Code de vérification'
                            type='text'
                            required
                            haserror={formHasError}
                            errormessage={formError}
                            onChange={handleChange}
                            name='code'
                            value={code}
                        />
                    )
                }

                <InputForm
                    label='Nouveau mot de passe'
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <InputForm
                    label="Confirmation mot de passe"
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <div className='button-container'>
                   <Button label='Connexion' type='submit' disabled={loading} />
                </div>
            </form>
        </section>
    )
}

export default ChangePassword;
