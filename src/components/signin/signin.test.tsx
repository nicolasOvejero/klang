import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BirthdayService from '../../common/services/birthday.service';
import UserService from '../../common/services/user.service';
import { createTestStore, getAllByTagName, getByClass } from '../../setupTests';
import Signin from './signin.component';

let store = createTestStore();

describe('render signin', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/');
        store.getState().auth = {};
        store.getState().user = {};
    });

    it('default', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        const mainDiv = getByClass('signin', screen);
        expect(mainDiv).toBeInTheDocument();

        const titleDiv = getByClass('title', screen);
        expect(titleDiv).toBeInTheDocument();

        const inputUsername = screen.getByText('login.username');
        expect(inputUsername).toBeInTheDocument();

        const inputPassword = screen.getByText('login.password');
        expect(inputPassword).toBeInTheDocument();

        const firstLabel = screen.getByText('login.first');
        expect(firstLabel).toBeInTheDocument();

        const buttonDiv = getByClass('button', screen);
        expect(buttonDiv).toBeInTheDocument();
        expect(buttonDiv.tagName).toEqual('BUTTON');
        expect(buttonDiv.innerHTML).toEqual('login.connection');
    });

    it('click on submit do nothing', () => {
        Auth.signIn = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        const button = screen.getByText(/login.connection/i);
        fireEvent.click(button);

        expect(Auth.signIn).not.toHaveBeenCalled();
    });

    it('on submit redirect to change password', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    challengeName: 'NEW_PASSWORD_REQUIRED',
                    username: 'test',
                    challengeParam: {
                        userAttributes: {
                            email: 'test@example.com',
                            email_verified: true
                        }
                    }
                };
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(store.getState().auth).toEqual({
            isConnected: false,
            user: {
                username: 'test',
                mail: 'test@example.com',
                emailVerified: true
            },
            tempUser: {
                challengeName: 'NEW_PASSWORD_REQUIRED',
                username: 'test',
                challengeParam: {
                    userAttributes: {
                        email: "test@example.com",
                        email_verified: true,
                    },
                }
            }
        });

        expect(Auth.signIn).toHaveBeenCalled();
        expect(Auth.signIn).toHaveBeenCalledWith('test', 'test');

        expect(window.location.pathname).toEqual('/change-password');
    });

    it('on submit UserService.getUsers failed', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (username: object, password: object) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': 'test',
                                email: 'test@example.com',
                                email_verified: true,
                                'cognito:groups': [],
                                sub: 'id-1',
                                family_name: 'TEST',
                                given_name: 'Test',
                                'custom:city': 'city',
                                birthdate: '1990-01-01'
                            },
                            jwtToken: 'token'
                        }
                    }
                };
            }
        );

        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(store.getState().auth).toEqual({
                isConnected: true,
                tempUser: null,
                user: {
                    username: 'test',
                    mail: 'test@example.com',
                    emailVerified: true,
                    token: 'token',
                    groups: [],
                    sub: 'id-1',
                }
            });
            expect(Auth.signIn).toHaveBeenCalled();
            expect(Auth.signIn).toHaveBeenCalledWith('test', 'test');

            await waitFor(async () => {
                expect(UserService.getUsers).toBeCalledTimes(1);
                expect(UserService.getUsers).toBeCalledWith({
                    filter: {
                        mail: {
                            eq: 'test@example.com'
                        }
                    }
                });

            });
        });

        expect(BirthdayService.assertBirthdayId).not.toHaveBeenCalled();

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/login.errors.wrongPasswordOrUsername/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("login.errors.wrongPasswordOrUsername");
    });

    it('on submit UserService.getUsers return 1 result', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (username: object, password: object) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': 'test',
                                email: 'test@example.com',
                                email_verified: true,
                                'cognito:groups': [],
                                sub: 'id-1',
                                family_name: 'TEST',
                                given_name: 'Test',
                                'custom:city': 'city',
                                birthdate: '1990-01-01'
                            },
                            jwtToken: 'token'
                        }
                    }
                };
            }
        );

        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                return [
                    { id: 'u-1' }
                ];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(Auth.signIn).toHaveBeenCalled();

            await waitFor(async () => {
                expect(UserService.getUsers).toBeCalledTimes(1);
                expect(UserService.getUsers).toBeCalledWith({
                    filter: {
                        mail: {
                            eq: 'test@example.com'
                        }
                    }
                });

            });
        });

        expect(BirthdayService.assertBirthdayId).not.toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
        expect(store.getState().user).toEqual({
            id: 'u-1',
        });
    });

    it('on submit UserService.creatUser failed', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (username: object, password: object) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': 'test',
                                email: 'test@example.com',
                                email_verified: true,
                                'cognito:groups': [],
                                sub: 'id-1',
                                family_name: 'TEST',
                                given_name: 'Test',
                                'custom:city': 'city',
                                birthdate: '1990-01-01'
                            },
                            jwtToken: 'token'
                        }
                    }
                };
            }
        );
        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                return 'b-1';
            }
        );
        UserService.creatUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Error');
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(Auth.signIn).toBeCalledTimes(1);

            await waitFor(async () => {
                expect(UserService.getUsers).toBeCalledTimes(1);

                await waitFor(async () => {
                    expect(BirthdayService.assertBirthdayId).toBeCalledTimes(1);
                    expect(BirthdayService.assertBirthdayId).toBeCalledWith('1990-01-01');
                });
            });
        });

        expect(UserService.creatUser).toBeCalledTimes(1);
        expect(UserService.creatUser).toBeCalledWith({
            input: {
                mail: 'test@example.com',
                firstname: 'Test',
                lastname: 'TEST',
                city: 'city',
                birthdayUsersId: 'b-1'
            }
        });

        const labels = getAllByTagName('label', screen);
        const errorDiv = within(labels[0]).getByText(/login.errors.wrongPasswordOrUsername/i);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv.innerHTML).toEqual("login.errors.wrongPasswordOrUsername");
    });

    it('on submit success', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (username: object, password: object) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': 'test',
                                email: 'test@example.com',
                                email_verified: true,
                                'cognito:groups': [],
                                sub: 'id-1',
                                family_name: 'TEST',
                                given_name: 'Test',
                                'custom:city': 'city',
                                birthdate: '1990-01-01'
                            },
                            jwtToken: 'token'
                        }
                    }
                };
            }
        );
        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                return 'b-1';
            }
        );
        UserService.creatUser = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'u-1'
                };
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(Auth.signIn).toBeCalledTimes(1);

            await waitFor(async () => {
                expect(UserService.getUsers).toBeCalledTimes(1);

                await waitFor(async () => {
                    expect(BirthdayService.assertBirthdayId).toBeCalledTimes(1);
                    expect(BirthdayService.assertBirthdayId).toBeCalledWith('1990-01-01');
                });
            });
        });

        expect(UserService.creatUser).toBeCalledTimes(1);
        expect(UserService.creatUser).toBeCalledWith({
            input: {
                mail: 'test@example.com',
                firstname: 'Test',
                lastname: 'TEST',
                city: 'city',
                birthdayUsersId: 'b-1'
            }
        });

        expect(window.location.pathname).toEqual('/profile');
        expect(store.getState().user).toEqual({
            id: 'u-1',
        });
    });

    it('on submit success but no profile', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (username: object, password: object) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': 'test',
                                email: 'test@example.com',
                                email_verified: true,
                                'cognito:groups': [],
                                sub: 'id-1',
                                family_name: 'TEST',
                                given_name: 'Test',
                                'custom:city': 'city',
                                birthdate: '1990-01-01'
                            },
                            jwtToken: 'token'
                        }
                    }
                };
            }
        );
        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                return 'b-1';
            }
        );
        UserService.creatUser = jest.fn().mockImplementation(
            (value: object) => {
                return null;
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(Auth.signIn).toBeCalledTimes(1);

            await waitFor(async () => {
                expect(UserService.getUsers).toBeCalledTimes(1);

                await waitFor(async () => {
                    expect(BirthdayService.assertBirthdayId).toBeCalledTimes(1);
                });
            });
        });

        expect(UserService.creatUser).toBeCalledTimes(1);
        expect(window.location.pathname).toEqual('/');
        expect(store.getState().user).toEqual({});
    });

    it('on submit success with no birthday', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (username: object, password: object) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': 'test',
                                email: 'test@example.com',
                                email_verified: true,
                                'cognito:groups': [],
                                sub: 'id-1',
                                family_name: 'TEST',
                                given_name: 'Test',
                                'custom:city': 'city'
                            },
                            jwtToken: 'token'
                        }
                    }
                };
            }
        );
        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        BirthdayService.assertBirthdayId = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Oups');
            }
        );
        UserService.creatUser = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'u-1'
                };
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(async () => {
            fireEvent.click(button);

            expect(Auth.signIn).toBeCalledTimes(1);

            await waitFor(async () => {
                expect(UserService.getUsers).toBeCalledTimes(1);
            });
        });

        expect(BirthdayService.assertBirthdayId).not.toHaveBeenCalled();

        expect(UserService.creatUser).toBeCalledTimes(1);
        expect(UserService.creatUser).toBeCalledWith({
            input: {
                mail: 'test@example.com',
                firstname: 'Test',
                lastname: 'TEST',
                city: 'city',
                birthdayUsersId: ''
            }
        });

        expect(window.location.pathname).toEqual('/profile');
        expect(store.getState().user).toEqual({
            id: 'u-1',
        });
    });

    it('on submit redirect to change password', async () => {
        Auth.signIn = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Password reset required for the user');
            }
        );

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Signin/>
                </Provider>
            </BrowserRouter>
        );

        setInputsValues();

        const button = screen.getByText(/login.connection/i);
        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(window.location.pathname).toEqual('/first-time');
        expect(store.getState().auth).toEqual({
            isConnected: false,
            user: {
                username: 'test',
            },
        });
    });

    function setInputsValues() {
        const inputUserName = screen.getByLabelText(/login.username/i);
        fireEvent.change(inputUserName, {
            target: {
                value: 'test'
            }
        });

        const inputPassword = screen.getByLabelText(/login.password/i);
        fireEvent.change(inputPassword, {
            target: {
                value: 'test'
            }
        });
    }
});
