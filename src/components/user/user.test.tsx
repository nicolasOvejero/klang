import { render, screen, within } from '@testing-library/react';
import { getAllByTagName, getByClass } from '../../setupTests';
import User from './user.component';

describe('render user', () => {
    it('default', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST'
                }}
            />
        );
        
        const mainDiv = getByClass('user', screen);
        expect(mainDiv).toBeInTheDocument();

        const imageDiv = getByClass('user-image', screen);
        expect(imageDiv).toBeInTheDocument();
        expect(imageDiv).toHaveClass('user-image', 'default');

        const infoDiv = getByClass('user-name', screen);
        expect(infoDiv).toBeInTheDocument();

        const ps = getAllByTagName('p', screen);
        expect(ps[0]).toBeInTheDocument();
        expect(ps[0].innerHTML).toEqual('Test');
        expect(ps[1]).toBeInTheDocument();
        expect(ps[1].innerHTML).toEqual('TEST');
    });

    it('attr size medium', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    size: 'medium'
                }}
            />
        );
        
        const mainDiv = getByClass('user', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('user', 'medium');
    });

    it('attr size small', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    size: 'small'
                }}
            />
        );
        
        const mainDiv = getByClass('user', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('user', 'small');
    });

    it('attr bg grey', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    background: 'bg-grey'
                }}
            />
        );
        
        const mainDiv = getByClass('user', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('user', 'bg-grey');
    });

    it('attr bg white', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    background: 'bg-white'
                }}
            />
        );
        
        const mainDiv = getByClass('user', screen);
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('user', 'bg-white');
    });

    it('with job', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    job: 'Testeur'
                }}
            />
        );
        
        const ps = getAllByTagName('p', screen);
        expect(ps[0]).toBeInTheDocument();
        expect(ps[0].innerHTML).toEqual('Test');
        expect(ps[1]).toBeInTheDocument();
        expect(ps[1].innerHTML).toEqual('TEST');
        expect(ps[2]).toBeInTheDocument();
        expect(ps[2].innerHTML).toEqual('Testeur');
    });

    it('with birthday', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    birthday: '01 octobre'
                }}
            />
        );
        
        const ps = getAllByTagName('p', screen);
        expect(ps[0]).toBeInTheDocument();
        expect(ps[0].innerHTML).toEqual('Test');
        expect(ps[1]).toBeInTheDocument();
        expect(ps[1].innerHTML).toEqual('TEST');
        expect(ps[2]).toBeInTheDocument();
        expect(ps[2].innerHTML).toEqual('user.born 01 octobre');
    });

    it('with arrivalDate', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    arrivalDate: '01 Novembre'
                }}
            />
        );
        
        const ps = getAllByTagName('p', screen);
        expect(ps[0]).toBeInTheDocument();
        expect(ps[0].innerHTML).toEqual('Test');
        expect(ps[1]).toBeInTheDocument();
        expect(ps[1].innerHTML).toEqual('TEST');
        expect(ps[2]).toBeInTheDocument();
        expect(ps[2].innerHTML).toEqual('user.arrive 01 Novembre');
    });

    it('with mail action', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    showActions: true,
                    mail: 'test@example.com'
                }}
            />
        );
        
        const actions = getByClass('actions', screen);
        expect(actions).toBeInTheDocument();
        const actionMail = within(actions).getByText('Envoyer un mail');
        expect(actionMail).toBeInTheDocument();
    });

    it('with image', () => {
        render(
            <User
                user={{
                    id: 'u-1',
                    firstname: 'Test',
                    lastname: 'TEST',
                    image: 'https://google.com/images'
                }}
            />
        );
        
        const imageDiv = getByClass('user-image', screen);
        expect(imageDiv).toBeInTheDocument();
        expect(imageDiv).toHaveStyle('background-image: url(https://google.com/images);');
    });
});
