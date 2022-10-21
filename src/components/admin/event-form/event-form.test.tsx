import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getByClass } from '../../../setupTests';
import EventForm from './event-form.component';

describe('render event form', () => {
    it('component add', () => {
        window.history.pushState({}, '', '/admin/events/add');

        render(
            <BrowserRouter>
                <EventForm />
            </BrowserRouter>
        );

        const section = getByClass('event-form', screen);
        expect(section).toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.events.title-add');

        const titleNotShownDel = screen.queryByText('admin.events.title-delete');
        expect(titleNotShownDel).not.toBeInTheDocument();

        const titleNotShownMan = screen.queryByText('admin.events.title-manage');
        expect(titleNotShownMan).not.toBeInTheDocument();
    });

    it('component delete', () => {
        window.history.pushState({}, '', '/admin/events/delete');
        render(
            <BrowserRouter>
                <EventForm />
            </BrowserRouter>
        );

        const section = getByClass('event-form', screen);
        expect(section).toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.events.title-delete');

        const titleNotShownAdd = screen.queryByText('admin.events.title-add');
        expect(titleNotShownAdd).not.toBeInTheDocument();

        const titleNotShownMan = screen.queryByText('admin.events.title-manage');
        expect(titleNotShownMan).not.toBeInTheDocument();
    });

    it('component manage', () => {
        window.history.pushState({}, '', '/admin/events/manage');
        render(
            <BrowserRouter>
                <EventForm />
            </BrowserRouter>
        );

        const section = getByClass('event-form', screen);
        expect(section).toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.events.title-manage');

        const titleNotShownAdd = screen.queryByText('admin.events.title-add');
        expect(titleNotShownAdd).not.toBeInTheDocument();

        const titleNotShownDel = screen.queryByText('admin.events.title-delete');
        expect(titleNotShownDel).not.toBeInTheDocument();
    });
});
