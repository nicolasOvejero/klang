import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getByClass } from '../../../setupTests';
import BirthdaysCarousel from './birthdays-carousel.component';

describe('render borthdays carousel', () => {
    it('default', () => {
        render(
            <BrowserRouter>
                <BirthdaysCarousel
                    users={[{
                        id: 'u-1',
                        firstname: 'Test',
                        lastname: 'TEST',
                    }]}
                />
            </BrowserRouter>
        );

        const mainDiv = getByClass('container', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('container', 'hidden', 'out-right');

        const titleDiv = getByClass('title', screen);
        expect(titleDiv).toBeInTheDocument();

        const usersContainerDiv = getByClass('users-container', screen);
        expect(usersContainerDiv).toBeInTheDocument();

        const userItemDiv = getByClass('user', screen);
        expect(userItemDiv).toBeInTheDocument();

        const buttonDiv = getByClass('button', screen);
        expect(buttonDiv).toBeInTheDocument();
        expect(buttonDiv.tagName).toEqual('BUTTON');
        expect(buttonDiv.innerHTML).toEqual('home.birthdays.button');
    });

    it('button click', () => {
        render(
            <BrowserRouter>
                <BirthdaysCarousel
                    users={[{
                        id: 'u-1',
                        firstname: 'Test',
                        lastname: 'TEST',
                    }]}
                />
            </BrowserRouter>
        );

        const button = screen.getByText('home.birthdays.button');
        fireEvent.click(button);

        expect(window.location.pathname).toEqual('/birthdays');
    });
});
