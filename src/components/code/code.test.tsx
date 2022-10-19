import { fireEvent, render, screen, within } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import mockStore, { getByTagName } from "../../setupTests";

let store = mockStore({
    auth: {
        isConnected: false
    },
    lang: 'fr'
});

const setupFull = () => {
    window.history.pushState({}, '', '/code');

    render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}

describe('render code page', () => {
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

    it('input for codes', () => {
        const firstConnectionLink = screen.getByText('login.code');

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
        expect(window.location.pathname).toEqual('/code');

        fireEvent.click(button);

        expect(button).toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/code');
    });

    it('button disabled if no code', () => {
        const labelEl = getByTagName('label', screen);
        const button = screen.getByText(/login.next/i);

        expect(button).not.toHaveAttribute('disabled');
        expect(window.location.pathname).toEqual('/code');

        const inputEl = within(labelEl).getByLabelText(/login.code/i);
        fireEvent.change(inputEl, { target: { value: '12code34' } });
        fireEvent.click(button);

        expect(window.location.pathname).toEqual('/change-password');
    });
});
