import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import BirthdayService from '../../common/services/birthday.service';
import EventService from '../../common/services/event.service';
import NewArrivalsService from '../../common/services/new-arrivals.service';
import UserService from '../../common/services/user.service';
import { createTestStore, getAllByTagName } from "../../setupTests";

let store = createTestStore();

const setupFull = () => {
    window.history.pushState({}, '', '/change-password');

    render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}

describe('render change password page', () => {
    beforeEach(() => {
        setupFull();
    })

    it('logo', () => {
        const logo = screen.getByAltText(/logo/i);

        expect(logo).toBeInTheDocument();
        expect(logo.nodeName).toEqual('IMG');
        expect(logo).toHaveClass('logo');
        expect(logo).toHaveAttribute('src', 'logo.png');
    });

    it('title', () => {
        const loginPageHeader = screen.getByText(/change-password.title/i);

        expect(loginPageHeader).toBeInTheDocument();
        expect(loginPageHeader.nodeName).toEqual('H2');
        expect(loginPageHeader).toHaveClass('title');
    });

    it('input for new password', () => {
        const firstConnectionLink = screen.getByText(/change-password.new/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('DIV');
        expect(firstConnectionLink).toHaveClass('label-text');
    });

    it('input for confirm password', () => {
        const firstConnectionLink = screen.getByText(/change-password.confirm/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('DIV');
        expect(firstConnectionLink).toHaveClass('label-text');
    });

    it('next button', () => {
        const button = screen.getByText(/change-password.connection/i);

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('button failed because not same password', () => {
        const button = screen.getByText(/change-password.connection/i);

        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/change-password');

        const labels = getAllByTagName('label', screen);
        const inputNew = within(labels[0]).getByLabelText(/change-password.new/i);
        const inputConf = within(labels[1]).getByLabelText(/change-password.confirm/i);

        fireEvent.change(inputNew, { target: { value: 'test' } });
        fireEvent.change(inputConf, { target: { value: 'test-test' } });

        fireEvent.click(button);

        const errorNewDiv = within(labels[0]).getByText(/change-password.errors.not-same-password/i);
        expect(errorNewDiv).toBeInTheDocument();
        expect(errorNewDiv).toHaveClass('error-text');

        const errorConfDiv = within(labels[1]).getByText(/change-password.errors.not-same-password/i);
        expect(errorConfDiv).toBeInTheDocument();
        expect(errorConfDiv).toHaveClass('error-text');

        expect(window.location.pathname).toEqual('/change-password');
    });

    it('error if auth completeNewPassword failed', async () => {
        Auth.completeNewPassword = jest.fn().mockImplementation(
            (value: string) => {
                throw new Error('Failed');
            }
        );

        const button = screen.getByText(/change-password.connection/i);

        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/change-password');

        const labels = getAllByTagName('label', screen);
        const inputNew = within(labels[0]).getByLabelText(/change-password.new/i);
        const inputConf = within(labels[1]).getByLabelText(/change-password.confirm/i);

        fireEvent.change(inputNew, { target: { value: 'test' } });
        fireEvent.change(inputConf, { target: { value: 'test' } });

        fireEvent.click(button);

        const errorNewDiv = within(labels[0]).getByText(/change-password.errors.update-ko/i);
        expect(errorNewDiv).toBeInTheDocument();
        expect(errorNewDiv).toHaveClass('error-text');

        const errorConfDiv = within(labels[1]).getByText(/change-password.errors.update-ko/i);
        expect(errorConfDiv).toBeInTheDocument();
        expect(errorConfDiv).toHaveClass('error-text');

        expect(window.location.pathname).toEqual('/change-password');
    });

    it('error if UserService getUsers failed', async () => {
        Auth.completeNewPassword = jest.fn().mockImplementation(
            (temp: any, value: string) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': "username",
                                email: 'email@test.com',
                                email_verified: true,
                                'cognito:groups': "test",
                                family_name: 'test',
                                given_name: 'test'
                            },
                            jwtToken: 'Bearer',
                            sub: 'sub',
                        }
                    }
                };
            }
        );
        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('no database');
            }
        );
        const button = screen.getByText(/change-password.connection/i);
        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/change-password');

        const labels = getAllByTagName('label', screen);
        const inputNew = within(labels[0]).getByLabelText(/change-password.new/i);
        const inputConf = within(labels[1]).getByLabelText(/change-password.confirm/i);

        fireEvent.change(inputNew, { target: { value: 'test' } });
        fireEvent.change(inputConf, { target: { value: 'test' } });

        await waitFor(async () => {
            fireEvent.click(button);
            expect(Auth.completeNewPassword).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(UserService.getUsers).toHaveBeenCalledTimes(1));
        });

        const errorNewDiv = within(labels[0]).getByText(/change-password.errors.update-ko/i);
        expect(errorNewDiv).toBeInTheDocument();
        expect(errorNewDiv).toHaveClass('error-text');

        const errorConfDiv = within(labels[1]).getByText(/change-password.errors.update-ko/i);
        expect(errorConfDiv).toBeInTheDocument();
        expect(errorConfDiv).toHaveClass('error-text');

        expect(window.location.pathname).toEqual('/change-password');
    });

    it('redirect on "/" if user found', async () => {
        Auth.completeNewPassword = jest.fn().mockImplementation(
            (temp: any, value: string) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': "username",
                                email: 'email@test.com',
                                email_verified: true,
                                'cognito:groups': "test",
                                family_name: 'test',
                                given_name: 'test'
                            },
                            jwtToken: 'Bearer',
                            sub: 'sub',
                        }
                    }
                };
            }
        );
        UserService.getUsers = jest.fn().mockImplementation(
            (value: object) => {
                return [{
                    id: 'id-1',
                    firstname: 'test',
                    lastname: 'TEST',
                }];
            }
        );
        BirthdayService.getBirthdays = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        EventService.getNextEvent = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        NewArrivalsService.getNewArrivals = jest.fn().mockImplementation(
            (value: object) => {
                return [];
            }
        );
        const button = screen.getByText(/change-password.connection/i);
        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/change-password');

        const labels = getAllByTagName('label', screen);
        const inputNew = within(labels[0]).getByLabelText(/change-password.new/i);
        const inputConf = within(labels[1]).getByLabelText(/change-password.confirm/i);

        fireEvent.change(inputNew, { target: { value: 'test' } });
        fireEvent.change(inputConf, { target: { value: 'test' } });

        await waitFor(async () => {
            fireEvent.click(button);
            expect(Auth.completeNewPassword).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(UserService.getUsers).toHaveBeenCalledTimes(1));
        });

        expect(window.location.pathname).toEqual('/');
    });

    it('error if UserService creatUser failed', async () => {
        Auth.completeNewPassword = jest.fn().mockImplementation(
            (temp: any, value: string) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': "username",
                                email: 'email@test.com',
                                email_verified: true,
                                'cognito:groups': "test",
                                family_name: 'test',
                                given_name: 'test'
                            },
                            jwtToken: 'Bearer',
                            sub: 'sub',
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
        UserService.creatUser = jest.fn().mockImplementation(
            (value: object) => {
                throw new Error('Failed');
            }
        );
        const button = screen.getByText(/change-password.connection/i);
        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/change-password');

        const labels = getAllByTagName('label', screen);
        const inputNew = within(labels[0]).getByLabelText(/change-password.new/i);
        const inputConf = within(labels[1]).getByLabelText(/change-password.confirm/i);

        fireEvent.change(inputNew, { target: { value: 'test' } });
        fireEvent.change(inputConf, { target: { value: 'test' } });

        await waitFor(async () => {
            fireEvent.click(button);
            expect(Auth.completeNewPassword).toHaveBeenCalledTimes(1);
            await waitFor(async () => {
                expect(UserService.getUsers).toHaveBeenCalledTimes(1)
                await waitFor(() => expect(UserService.creatUser).toHaveBeenCalledTimes(1));
            });
        });

        const errorNewDiv = within(labels[0]).getByText(/change-password.errors.update-ko/i);
        expect(errorNewDiv).toBeInTheDocument();
        expect(errorNewDiv).toHaveClass('error-text');

        const errorConfDiv = within(labels[1]).getByText(/change-password.errors.update-ko/i);
        expect(errorConfDiv).toBeInTheDocument();
        expect(errorConfDiv).toHaveClass('error-text');

        expect(window.location.pathname).toEqual('/change-password');
    });

    it('redirect on "/profile" if user found', async () => {
        Auth.completeNewPassword = jest.fn().mockImplementation(
            (temp: any, value: string) => {
                return {
                    signInUserSession: {
                        idToken: {
                            payload: {
                                'cognito:username': "username",
                                email: 'email@test.com',
                                email_verified: true,
                                'cognito:groups': "test",
                                family_name: 'test',
                                given_name: 'test'
                            },
                            jwtToken: 'Bearer',
                            sub: 'sub',
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
        UserService.creatUser = jest.fn().mockImplementation(
            (value: object) => {
                return {
                    id: 'id-1',
                    firstname: 'test',
                    lastname: 'TEST',
                };
            }
        );

        const button = screen.getByText(/change-password.connection/i);
        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/change-password');

        const labels = getAllByTagName('label', screen);
        const inputNew = within(labels[0]).getByLabelText(/change-password.new/i);
        const inputConf = within(labels[1]).getByLabelText(/change-password.confirm/i);

        fireEvent.change(inputNew, { target: { value: 'test' } });
        fireEvent.change(inputConf, { target: { value: 'test' } });

        await waitFor(async () => {
            fireEvent.click(button);
            expect(Auth.completeNewPassword).toHaveBeenCalledTimes(1);
            await waitFor(async () => {
                expect(UserService.getUsers).toHaveBeenCalledTimes(1)
                await waitFor(() => expect(UserService.creatUser).toHaveBeenCalledTimes(1));
            });
        });

        expect(window.location.pathname).toEqual('/profile');
    });
});
