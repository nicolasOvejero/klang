import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getByClass } from '../../../setupTests';
import BirthdayForm from './birthday-form.component';

describe('render birthday form', () => {
    it('component add', () => {
        window.history.pushState({}, '', '/admin/birthdays/add');
        render(
            <BrowserRouter>
                <BirthdayForm />
            </BrowserRouter>
        );

        const section = getByClass('birthday-form', screen);
        expect(section).toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.birthdays.title-add');

        const titleNotShown = screen.queryByText('admin.birthdays.title-manage');
        expect(titleNotShown).not.toBeInTheDocument();
    });

    it('component manage', () => {
        window.history.pushState({}, '', '/admin/birthdays/manage');
        render(
            <BrowserRouter>
                <BirthdayForm />
            </BrowserRouter>
        );

        const section = getByClass('birthday-form', screen);
        expect(section).toBeInTheDocument();

        const titleNotShown = screen.queryByText('admin.birthdays.title-add');
        expect(titleNotShown).not.toBeInTheDocument();

        const title = getByClass('title', screen);
        expect(title).toBeInTheDocument();
        expect(title.innerHTML).toEqual('admin.birthdays.title-manage');
    });
});
