import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button.component';
import InputForm from '../input-form/input-form.component';
import { API, Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { useNavigate } from 'react-router-dom';
import { listUsers } from '../../graphql/queries';
import { GraphQLResult } from "@aws-amplify/api";
import './signin.style.scss';
import { CreateUserMutation, ListUsersQuery } from '../../API';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import { createUser } from '../../graphql/mutations';
import { UserModel } from '../user/user.component';

const defaultSignInState = {
    username: '',
    password: '',
    formHasError: false,
    formError: '',
    loading: false
};

function Signin() {
    const [signInState, setSignInState] = useState(defaultSignInState);
    const { username, password, formHasError, formError, loading } = signInState;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSignInState({
            ...signInState,
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

    async function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (loading || !username || !password) {
            return;
        }

        setSignInState({
            ...signInState,
            loading: true
        });

        try {
            const user = await Auth.signIn(username, password);
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                 dispatch({
                    type: AUTH_ACTION_TYPES.SET_TEMP_AUTH,
                    payload: {
                        isConnected: false,
                        user: {
                            username: user.username,
                            mail: user.challengeParam.userAttributes.email,
                            emailVerified: user.challengeParam.userAttributes.email_verified,
                        },
                        tempUser: user
                    }
                });
                navigate('/change-password');
                return;
            }
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
                        sub: user.signInUserSession.idToken.payload.sub,
                    }
                }
            });
            await getUserProfile(
                user.signInUserSession.idToken.payload.email,
                user.signInUserSession.idToken.payload.family_name,
                user.signInUserSession.idToken.payload.given_name,
            );
        } catch (error: any) {
            setSignInState({
                ...signInState,
                formHasError: true,
                formError: "Mot de passe ou utilisateur incorrect", 
                loading: false
            });
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
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='username'
                    value={username}
                />

                <InputForm
                    label='Mot de passe'
                    type='password'
                    required
                    haserror={formHasError}
                    errormessage={formError}
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <div className='button-container'>
                   <Button label='Connexion' type='submit' disabled={loading} />
                </div>
            </form>
        </section>
    );
}

export default Signin;
