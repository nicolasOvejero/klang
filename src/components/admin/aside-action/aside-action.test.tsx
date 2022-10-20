import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getAllByClass, getByClass } from '../../../setupTests';
import AsideAction from './aside-action.component';

describe('render action side', () => {
    it('component with no delete', () => {
        render(
            <BrowserRouter>
                <AsideAction
                    title='Anniversaire'
                    pathAdd='/add'
                    color='primary'
                    handleClickItem={() => {}}
                />
            </BrowserRouter>
        );

        const mainDiv = getByClass('aside-action', screen);
        expect(mainDiv).toBeInTheDocument();

        const titleP = getByClass('title', screen);
        expect(titleP).toBeInTheDocument();
        expect(titleP).toHaveClass('title', 'primary');

        const link = getByClass('link', screen);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/add');
    });

    it('component with delete', () => {
        render(
            <BrowserRouter>
                <AsideAction
                    title='Anniversaire'
                    pathAdd='/add'
                    pathDelete='/delete'
                    color='primary'
                    handleClickItem={() => {}}
                />
            </BrowserRouter>
        );

        const mainDiv = getByClass('aside-action', screen);
        expect(mainDiv).toBeInTheDocument();

        const titleP = getByClass('title', screen);
        expect(titleP).toBeInTheDocument();
        expect(titleP).toHaveClass('title', 'primary');

        const links = getAllByClass('link', screen);

        expect(links[0]).toBeInTheDocument();
        expect(links[0]).toHaveAttribute('href', '/add');

        expect(links[1]).toBeInTheDocument();
        expect(links[1]).toHaveAttribute('href', '/delete');
    });
});
