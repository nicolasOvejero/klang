import { render, screen, within } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { getAllByTagName } from '../../setupTests';
import InputDate, { InputDateProps } from './input-date.component';

const defaultInputDateProps: InputDateProps = {
    day: {
        value: '',
        formHasError: false,
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {}
    },
    month: {
        value: '',
        formHasError: false,
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {}
    },
    year: {
        value: '',
        formHasError: false,
        onChange: (event: ChangeEvent<HTMLSelectElement>) => {}
    },
    startDateYear: 2010,
    endDateYear: 2030,
}

describe('render input date', () => {
    it('default container', () => {
        render(
            <InputDate
                day={defaultInputDateProps.day}
                month={defaultInputDateProps.month}
                year={defaultInputDateProps.year}
                startDateYear={defaultInputDateProps.startDateYear}
                endDateYear={defaultInputDateProps.endDateYear}
            />
        );

        const mainContainer = getAllByTagName('div', screen)[1];
        expect(mainContainer).toHaveClass('date-input');
        expect(mainContainer.childElementCount).toEqual(3);
    });

    it('default day dropdown', () => {
        render(
            <InputDate
                day={defaultInputDateProps.day}
                month={defaultInputDateProps.month}
                year={defaultInputDateProps.year}
                startDateYear={defaultInputDateProps.startDateYear}
                endDateYear={defaultInputDateProps.endDateYear}
            />
        );

        const labelsEl = getAllByTagName('label', screen);
        const labelDay = labelsEl[0];

        expect(labelDay).toBeInTheDocument();
        expect(labelDay).toHaveClass('label');
        expect(labelDay).not.toHaveClass('error');
        expect(labelDay).toHaveAttribute('for', 'day');

        const labelDayDiv = within(labelDay).getByText('Jour');

        expect(labelDayDiv).toBeInTheDocument();
        expect(labelDayDiv).toHaveClass('label-text');
        expect(labelDayDiv).not.toHaveClass('filled');

        const inputEl = within(labelDay).getByLabelText('Jour');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('');
        expect(inputEl).toHaveAttribute('id', 'day');

        const selectsEl = getAllByTagName('select', screen);
        const selectDay = selectsEl[0];

        expect(selectDay.childElementCount).toEqual(32);
        expect((selectDay.children[0] as HTMLOptionElement).value).toEqual('');
        for (let i = 1; i < 31; i++) {
            expect((selectDay.children[i] as HTMLOptionElement).value).toEqual(i.toString());
            expect((selectDay.children[i] as HTMLOptionElement).text).toEqual(i.toString());
        }
    });

    it('default month dropdown', () => {
        render(
            <InputDate
                day={defaultInputDateProps.day}
                month={defaultInputDateProps.month}
                year={defaultInputDateProps.year}
                startDateYear={defaultInputDateProps.startDateYear}
                endDateYear={defaultInputDateProps.endDateYear}
            />
        );

        const labelsEl = getAllByTagName('label', screen);
        const labelMonth = labelsEl[1];

        expect(labelMonth).toBeInTheDocument();
        expect(labelMonth).toHaveClass('label');
        expect(labelMonth).not.toHaveClass('error');
        expect(labelMonth).toHaveAttribute('for', 'month');

        const labelMonthDiv = within(labelMonth).getByText('Mois');

        expect(labelMonthDiv).toBeInTheDocument();
        expect(labelMonthDiv).toHaveClass('label-text');
        expect(labelMonthDiv).not.toHaveClass('filled');

        const inputEl = within(labelMonth).getByLabelText('Mois');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('');
        expect(inputEl).toHaveAttribute('id', 'month');

        const selectsEl = getAllByTagName('select', screen);
        const selectDay = selectsEl[1];

        expect(selectDay.childElementCount).toEqual(13);
        expect((selectDay.children[0] as HTMLOptionElement).value).toEqual('');
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        for (let i = 1; i < 13; i++) {
            expect((selectDay.children[i] as HTMLOptionElement).value).toEqual(i.toString());
            expect((selectDay.children[i] as HTMLOptionElement).text).toEqual(months[i - 1]);
        }
    });

    it('default year dropdown', () => {
        render(
            <InputDate
                day={defaultInputDateProps.day}
                month={defaultInputDateProps.month}
                year={defaultInputDateProps.year}
                startDateYear={defaultInputDateProps.startDateYear}
                endDateYear={defaultInputDateProps.endDateYear}
            />
        );

        const labelsEl = getAllByTagName('label', screen);
        const labelYear = labelsEl[2];

        expect(labelYear).toBeInTheDocument();
        expect(labelYear).toHaveClass('label');
        expect(labelYear).not.toHaveClass('error');
        expect(labelYear).toHaveAttribute('for', 'year');

        const labelYearDiv = within(labelYear).getByText('Année');

        expect(labelYearDiv).toBeInTheDocument();
        expect(labelYearDiv).toHaveClass('label-text');
        expect(labelYearDiv).not.toHaveClass('filled');

        const inputEl = within(labelYear).getByLabelText('Année');

        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveValue('');
        expect(inputEl).toHaveAttribute('id', 'year');

        const selectsEl = getAllByTagName('select', screen);
        const selectDay = selectsEl[2];

        expect(selectDay.childElementCount).toEqual(22);
        expect((selectDay.children[0] as HTMLOptionElement).value).toEqual('');
        for (let i = 2010; i < 2030; i++) {
            expect((selectDay.children[i - 2009] as HTMLOptionElement).value).toEqual(i.toString());
            expect((selectDay.children[i - 2009] as HTMLOptionElement).text).toEqual(i.toString());
        }
    });

    it('error dropdowns', () => {
        defaultInputDateProps.day.formHasError = true;
        defaultInputDateProps.month.formHasError = true;
        defaultInputDateProps.year.formHasError = true;
        defaultInputDateProps.day.value = '1';
        defaultInputDateProps.month.value = '1';
        defaultInputDateProps.year.value = '2020';
        render(
            <InputDate
                day={defaultInputDateProps.day}
                month={defaultInputDateProps.month}
                year={defaultInputDateProps.year}
                startDateYear={defaultInputDateProps.startDateYear}
                endDateYear={defaultInputDateProps.endDateYear}
            />
        );

        const labelsEl = getAllByTagName('label', screen);
        const labelDay = labelsEl[0];

        expect(labelDay).toBeInTheDocument();
        expect(labelDay).toHaveClass('error');

        const labelDayDiv = within(labelDay).getByText('Jour');

        expect(labelDayDiv).toBeInTheDocument();
        expect(labelDayDiv).toHaveClass('filled');

        const inputDayEl = within(labelDay).getByLabelText('Jour');

        expect(inputDayEl).toBeInTheDocument();
        expect(inputDayEl).toHaveValue('1');

        const labelMonth = labelsEl[1];

        expect(labelMonth).toBeInTheDocument();
        expect(labelMonth).toHaveClass('error');

        const labelMonthDiv = within(labelMonth).getByText('Mois');

        expect(labelMonthDiv).toBeInTheDocument();
        expect(labelMonthDiv).toHaveClass('filled');

        const inputMonthEl = within(labelMonth).getByLabelText('Mois');

        expect(inputMonthEl).toBeInTheDocument();
        expect(inputMonthEl).toHaveValue('1');

        const labelYear = labelsEl[2];

        expect(labelYear).toBeInTheDocument();
        expect(labelYear).toHaveClass('error');

        const labelYearDiv = within(labelYear).getByText('Année');

        expect(labelYearDiv).toBeInTheDocument();
        expect(labelYearDiv).toHaveClass('filled');

        const inputYearEl = within(labelYear).getByLabelText('Année');

        expect(inputYearEl).toBeInTheDocument();
        expect(inputYearEl).toHaveValue('2020');
    });
});
