import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getByClass } from '../../../setupTests';
import NewArrivalForm from './new-arrival-form.component';

describe('render new-arrivals form', () => {
    it('component add', () => {
        window.history.pushState({}, '', '/admin/new-arrivals/add');
        render(
            <BrowserRouter>
                <NewArrivalForm />
            </BrowserRouter>
        );

        const section = getByClass('new-arrival-form', screen);
        expect(section).toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.new-arrivals.title-add');

        const titleNotShown = screen.queryByText('admin.new-arrivals.title-manage');
        expect(titleNotShown).not.toBeInTheDocument();
    });

    it('component manage', () => {
        window.history.pushState({}, '', '/admin/new-arrivals/manage');
        render(
            <BrowserRouter>
                <NewArrivalForm />
            </BrowserRouter>
        );

        const section = getByClass('new-arrival-form', screen);
        expect(section).toBeInTheDocument();

        const titleNotShown = screen.queryByText('admin.new-arrivals.title-add');
        expect(titleNotShown).not.toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.new-arrivals.title-manage');
    });
});
