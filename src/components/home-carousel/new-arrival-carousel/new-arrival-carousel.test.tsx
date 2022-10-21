import { fireEvent, render, screen, within } from '@testing-library/react';
import moment from 'moment';
import { BrowserRouter } from 'react-router-dom';
import { getAllByClass, getByClass } from '../../../setupTests';
import NewArrivalsCarousel from './new-arrival-carousel.component';

describe('render new arrival carousel', () => {
    it('default', () => {
        render(
            <BrowserRouter>
                <NewArrivalsCarousel
                    newArrivals={[{
                        id: 'na-1',
                        date: new Date(),
                        users: [{
                            id: 'u-1',
                            firstname: 'Test',
                            lastname: 'TEST',
                        }]
                    }]}
                />
            </BrowserRouter>
        );

        const mainDiv = getByClass('container', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('container', 'new-arrivals-carousel', 'hidden', 'out-right');

        const titleDiv = getByClass('title', screen);
        expect(titleDiv).toBeInTheDocument();

        const usersContainerDiv = getByClass('new-arrivals-container', screen);
        expect(usersContainerDiv).toBeInTheDocument();

        const userItemDiv = getByClass('user', screen);
        expect(userItemDiv).toBeInTheDocument();

        const buttonDiv = getByClass('button', screen);
        expect(buttonDiv).toBeInTheDocument();
        expect(buttonDiv.tagName).toEqual('BUTTON');
        expect(buttonDiv.innerHTML).toEqual('home.new-arrivals.button');
    });

    it('button click', () => {
        render(
            <BrowserRouter>
                <NewArrivalsCarousel
                    newArrivals={[{
                        id: 'na-1',
                        date: new Date(),
                        users: [{
                            id: 'u-1',
                            firstname: 'Test',
                            lastname: 'TEST',
                        }]
                    }]}
                />
            </BrowserRouter>
        );

        const button = screen.getByText('home.new-arrivals.button');
        fireEvent.click(button);

        expect(window.location.pathname).toEqual('/new-arrivals');
    });

    it('check order users', () => {
        render(
            <BrowserRouter>
                <NewArrivalsCarousel
                    newArrivals={[{
                        id: 'na-1',
                        date: moment().toDate(),
                        users: [{
                            id: 'u-1',
                            firstname: 'Test',
                            lastname: 'TEST',
                        }]
                    }, {
                        id: 'na-2',
                        date: moment().add(1, 'day').toDate(),
                        users: [{
                            id: 'u-2',
                            firstname: 'Test 2',
                            lastname: 'TEST 2',
                        }]
                    }, {
                        id: 'na-3',
                        date: moment().add(-1, 'day').toDate(),
                        users: [{
                            id: 'u-3',
                            firstname: 'Test 3',
                            lastname: 'TEST 3',
                        }]
                    }]}
                />
            </BrowserRouter>
        );

        const userItems = getAllByClass('user-name', screen);
        const userItem0 = within(userItems[0]).getByText('Test 3');
        expect(userItem0).toBeInTheDocument();
        const userItem1 = within(userItems[1]).getByText('Test');
        expect(userItem1).toBeInTheDocument();
        const userItem2 = within(userItems[2]).getByText('Test 2');
        expect(userItem2).toBeInTheDocument();
    });
});
