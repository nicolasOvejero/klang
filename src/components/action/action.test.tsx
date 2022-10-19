import { fireEvent, render, screen } from '@testing-library/react';
import { getAllByClass, getByClass } from '../../setupTests';
import Action from './action.component';

describe('render action menu', () => {
    it('default', () => {
        render(
            <Action
                actions={ [ { label: 'Envoyer un mail', action: 'mail', mail: 'test@example.com' } ] }
            />
        );

        const mainDiv = getByClass('actions', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv.tagName).toEqual('DIV');

        const overflowDiv = getByClass('overflow-menu', screen);
        expect(overflowDiv).toBeInTheDocument();
        expect(overflowDiv.tagName).toEqual('DIV');
        expect(overflowDiv).toHaveClass('overflow-menu', 'close');
        expect(overflowDiv.childElementCount).toEqual(1);

        const iconSVG = getByClass('icon', screen);
        expect(iconSVG).toBeInTheDocument();
        expect(iconSVG.tagName).toEqual('svg');
    });

    it('open', () => {
        render(
            <Action
                actions={ [ { label: 'Envoyer un mail', action: 'mail', mail: 'test@example.com' } ] }
            />
        );

        const overflowDiv = getByClass('overflow-menu', screen);
        const iconSvg = getByClass('icon', screen);
        expect(overflowDiv).toHaveClass('overflow-menu', 'close');
        fireEvent.click(iconSvg);
        expect(overflowDiv).toHaveClass('overflow-menu', 'open');
    });

    it('click on item mail', () => {
        window.open = jest.fn().mockImplementation(
            (value: string, targer: string) => {}
        );

        render(
            <Action
                actions={ [ { label: 'Envoyer un mail', action: 'mail', mail: 'test@example.com' } ] }
            />
        );

        const iconSvg = getByClass('icon', screen);
        fireEvent.click(iconSvg);

        const items = getAllByClass('item', screen);
        expect(items.length).toEqual(1);
        fireEvent.click(items[0]);

        expect(window.open).toHaveBeenCalledTimes(1);
        expect(window.open).toHaveBeenCalledWith('mailto:test@example.com', '_blank');
    });
});
