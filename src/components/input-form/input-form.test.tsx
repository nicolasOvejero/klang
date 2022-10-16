import { render, screen, within } from '@testing-library/react';
import { getByTagName } from '../../setupTests';
import InputForm from './input-form.component';

describe('render input', () => {
    it('default', () => {
        render(
            <InputForm
                name='input-name'
                label='Input Test'
                type='text'
            />
        );

        const labelEl = getByTagName('label', screen);

        expect(labelEl).toBeInTheDocument();
        expect(labelEl).toHaveClass('label');
        expect(labelEl).not.toHaveClass('error');
        expect(labelEl).toHaveAttribute('for', 'input-name');

        const labelDiv = within(labelEl).getByText('Input Test');

        expect(labelDiv).toBeInTheDocument();
        expect(labelDiv).toHaveClass('label-text');
        expect(labelDiv).not.toHaveClass('filled');

        const inputEl = within(labelEl).getByLabelText('Input Test');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveClass('input');
        expect(inputEl).toHaveValue('');
        expect(inputEl).toHaveAttribute('id', 'input-name');

        const error = within(labelEl).queryByText("Message d'erreur");
        expect(error).not.toBeInTheDocument();
    });

    it('with value', () => {
        render(
            <InputForm
                name='input-name'
                label='Input Test'
                type='text'
                value='Valeur de test'
                onChange={() => {}}
            />
        );

        const labelEl = getByTagName('label', screen);

        expect(labelEl).toBeInTheDocument();
        expect(labelEl).toHaveClass('label');
        expect(labelEl).not.toHaveClass('error');
        expect(labelEl).toHaveAttribute('for', 'input-name');

        const labelDiv = within(labelEl).getByText('Input Test');

        expect(labelDiv).toBeInTheDocument();
        expect(labelDiv).toHaveClass('label-text', 'filled');

        const inputEl = within(labelEl).getByLabelText('Input Test');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveClass('input');
        expect(inputEl).toHaveValue('Valeur de test');
        expect(inputEl).toHaveAttribute('id', 'input-name');

        const error = within(labelEl).queryByText("Message d'erreur");
        expect(error).not.toBeInTheDocument();
    });

    it('with error', () => {
        render(
            <InputForm
                name='input-name-failed'
                label='Input Test'
                haserror={true}
                errormessage="Message d'erreur"
                value='Valeur fausse'
                onChange={() => {}}
            />
        );

        const labelEl = getByTagName('label', screen);

        expect(labelEl).toBeInTheDocument();
        expect(labelEl).toHaveClass('label', 'error');
        expect(labelEl).toHaveAttribute('for', 'input-name-failed');

        const errorDiv = within(labelEl).getByText("Message d'erreur");

        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('error-text');

        const labelDiv = within(labelEl).getByText(/Input Test/i);

        expect(labelDiv).toBeInTheDocument();
        expect(labelDiv).toHaveClass('label-text', 'filled');

        const inputEl = within(labelEl).getByLabelText(/Input Test/i);

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveClass('input');
        expect(inputEl).toHaveValue('Valeur fausse');
        expect(inputEl).toHaveAttribute('id', 'input-name-failed');
    });
});
