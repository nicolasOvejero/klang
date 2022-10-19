import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import mockStore from './setupTests';

let store = mockStore({
    auth: {
        isConnected: false
    },
    lang: 'fr'
});

const setup = () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );

    expect(window.location.pathname).toEqual('/login');
}

describe('render login page', () => {
    beforeEach(() => {
    	setup();
    });

    it('logo', () => {
        const logo = screen.getByAltText(/logo/i);

        expect(logo).toBeInTheDocument();
        expect(logo.nodeName).toEqual('IMG');
        expect(logo).toHaveClass('logo');
        expect(logo).toHaveAttribute('src', 'logo.png');
    });

    it('title', () => {
        const loginPageHeader = screen.getByText(/login.title/i);

        expect(loginPageHeader).toBeInTheDocument();
        expect(loginPageHeader.nodeName).toEqual('H2');
        expect(loginPageHeader).toHaveClass('title');
    });

    it('input for username', () => {
        const firstConnectionLink = screen.getByText(/login.username/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('DIV');
        expect(firstConnectionLink).toHaveClass('label-text');
    });

    it('input for password', () => {
        const firstConnectionLink = screen.getByText(/login.password/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('DIV');
        expect(firstConnectionLink).toHaveClass('label-text');
    });

    it('first time link', () => {
        const firstConnectionLink = screen.getByText(/login.first/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('A');
        expect(firstConnectionLink).toHaveAttribute('href', '/first-time');
        expect(firstConnectionLink).toHaveClass('first-time');
    });

    it('connection button', () => {
        const firstConnectionLink = screen.getByText(/^login.connection/i);

        expect(firstConnectionLink).toBeInTheDocument();
        expect(firstConnectionLink.nodeName).toEqual('BUTTON');
        expect(firstConnectionLink).toHaveAttribute('type', 'submit');
    });
});
