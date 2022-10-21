import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getByClass } from '../../../setupTests';
import NewArrivalForm from './new-arrival-form.component';

describe('render new-arrivals form', () => {
    it('component add', async () => {
        window.history.pushState({}, '', '/admin/new-arrivals/add');
        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalForm />
                </BrowserRouter>
            );
        });

        const section = getByClass('new-arrival-form', screen);
        expect(section).toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.new-arrivals.title-add');

        const titleNotShown = screen.queryByText('admin.new-arrivals.title-manage');
        expect(titleNotShown).not.toBeInTheDocument();
    });

    it('component manage', async () => {
        window.history.pushState({}, '', '/admin/new-arrivals/manage');
        await waitFor(() => {
            render(
                <BrowserRouter>
                    <NewArrivalForm />
                </BrowserRouter>
            );
        });

        const section = getByClass('new-arrival-form', screen);
        expect(section).toBeInTheDocument();

        const titleNotShown = screen.queryByText('admin.new-arrivals.title-add');
        expect(titleNotShown).not.toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.new-arrivals.title-manage');
    });
});
