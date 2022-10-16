import { render, screen, within } from '@testing-library/react';
import { getByTagName } from '../../setupTests';
import Dropdown, { DropdownOption } from './dropdown.component';

const defaultOptions: DropdownOption[] = [
    {
        value: '',
        label: ''
    },
    {
        value: 'V1',
        label: 'Label 1'
    },
    {
        value: 'V2',
        label: 'Label 2'
    }
]

describe('render drowpdown', () => {
    it('default', () => {
        render(
            <Dropdown
                name='dropdown-name'
                label='DropDown Test'
                options={defaultOptions}
            />
        );

        const labelEl = getByTagName('label', screen);

        expect(labelEl).toBeInTheDocument();
        expect(labelEl).toHaveClass('label');
        expect(labelEl).not.toHaveClass('error');
        expect(labelEl).toHaveAttribute('for', 'dropdown-name');

        const labelDiv = within(labelEl).getByText('DropDown Test');

        expect(labelDiv).toBeInTheDocument();
        expect(labelDiv).toHaveClass('label-text');
        expect(labelDiv).not.toHaveClass('filled');

        const inputEl = within(labelEl).getByLabelText('DropDown Test');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('');
        expect(inputEl).toHaveAttribute('id', 'dropdown-name');

        const error = within(labelEl).queryByText("Message d'erreur");
        expect(error).not.toBeInTheDocument();
    });

    it('with value', () => {
        render(
            <Dropdown
                name='dropdown-name'
                label='DropDown Test'
                value='V1'
                options={defaultOptions}
                onChange={() => {}}
            />
        );

        const labelEl = getByTagName('label', screen);

        expect(labelEl).toBeInTheDocument();
        expect(labelEl).toHaveClass('label');
        expect(labelEl).not.toHaveClass('error');
        expect(labelEl).toHaveAttribute('for', 'dropdown-name');

        const labelDiv = within(labelEl).getByText('DropDown Test');

        expect(labelDiv).toBeInTheDocument();
        expect(labelDiv).toHaveClass('label-text');
        expect(labelDiv).toHaveClass('filled');

        const inputEl = within(labelEl).getByLabelText('DropDown Test');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('V1');
        expect(inputEl).toHaveAttribute('id', 'dropdown-name');

        const error = within(labelEl).queryByText("Message d'erreur");
        expect(error).not.toBeInTheDocument();
    });

    it('with value and error', () => {
        render(
            <Dropdown
                name='dropdown-name'
                label='DropDown Test'
                value='V1'
                options={defaultOptions}
                onChange={() => { }}
                haserror={true}
                errormessage='Error message'
            />
        );

        const labelEl = getByTagName('label', screen);

        expect(labelEl).toBeInTheDocument();
        expect(labelEl).toHaveClass('label');
        expect(labelEl).toHaveClass('error');
        expect(labelEl).toHaveAttribute('for', 'dropdown-name');

        const labelDiv = within(labelEl).getByText(/DropDown Test/i);

        expect(labelDiv).toBeInTheDocument();
        expect(labelDiv).toHaveClass('label-text');
        expect(labelDiv).toHaveClass('filled');

        const inputEl = within(labelEl).getByLabelText(/DropDown Test/i);

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('V1');
        expect(inputEl).toHaveAttribute('id', 'dropdown-name');

        const error = within(labelEl).queryByText('Error message');
        expect(error).toBeInTheDocument();
        expect(error).toHaveClass('error-text');
    });
});
