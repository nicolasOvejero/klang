import { fireEvent, render, screen } from '@testing-library/react';
import Button from './button.component';

describe('render button', () => {
    it('default', () => {
        render(
            <Button
                label='Je click'
                type='button'
            />
        );

        const button = screen.getByText('Je click');

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveClass('button');
        expect(button).toHaveProperty('type', 'button');
    });

    it('disabled', () => {
        render(
            <Button
                label='Je click'
                type='button'
                disabled={true}
            />
        );

        const button = screen.getByText('Je click');

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveClass('button');
        expect(button).toHaveProperty('type', 'button');
        expect(button).toHaveProperty('disabled', true);
    });

    it('primary and type submit', () => {
        render(
            <Button
                label='Je click'
                type='submit'
                color='primary'
            />
        );

        const button = screen.getByText('Je click');

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveClass('button', 'primary');
        expect(button).toHaveProperty('type', 'submit');
    });

    it('secondary and type reset', () => {
        render(
            <Button
                label='Je click'
                type='reset'
                color='secondary'
            />
        );

        const button = screen.getByText('Je click');

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveClass('button', 'secondary');
        expect(button).toHaveProperty('type', 'reset');
    });

    it('and action click', async () => {
        let value = null;
        const click = () => {
            value = 'clicked';
        }

        render(
            <Button
                label='Je click'
                type='button'
                clickHandler={click}
            />
        );

        const button = screen.getByText('Je click');

        expect(button).toBeInTheDocument();
        expect(button.nodeName).toEqual('BUTTON');
        expect(button).toHaveClass('button');
        expect(button).toHaveProperty('type', 'button');

        fireEvent(
            screen.getByText('Je click'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(value).toEqual('clicked');
    });
});
