import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { createTestStore, getByTagName } from "../../setupTests";

let store = createTestStore();

const setupFull = () => {
    window.history.pushState({}, '', '/first-time');

    render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}

describe('render first time page', () => {
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

    it('input for username', () => {
        const firstConnectionLink = screen.getByText(/login.username/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('DIV');
        expect(firstConnectionLink).toHaveClass('label-text');
    });

    it('next button', () => {
        const button = screen.getByText(/login.next/i);

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('button disabled if no code', () => {
        const button = screen.getByText(/login.next/i);

        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/first-time');

        fireEvent.click(button);

        expect(button).toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/first-time');
    });

    it('redirect if code and click', async () => {
        Auth.forgotPassword = jest.fn().mockImplementation(
            (value: string) => {
                return true;
            }
        );

        const labelEl = getByTagName('label', screen);
        const button = screen.getByText(/login.next/i);
        const inputEl = within(labelEl).getByLabelText(/login.username/i);

        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/first-time');

        fireEvent.change(inputEl, { target: { value: 'test' } });

        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(window.location.pathname).toEqual('/code');
    });

    it('error if auth forgotPassword failed', async () => {
        Auth.forgotPassword = jest.fn().mockImplementation(
            (value: string) => {
                throw new Error('Failed');
            }
        );

        const labelEl = getByTagName('label', screen);
        const button = screen.getByText(/login.next/i);
        const inputEl = within(labelEl).getByLabelText(/login.username/i);

        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/first-time');

        fireEvent.change(inputEl, { target: { value: 'test' } });

        await waitFor(() => {
            fireEvent.click(button);
        });

        expect(window.location.pathname).toEqual('/first-time');

        const errorDiv = within(labelEl).getByText("login.errors.unknown");

        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('error-text');
    });
});
