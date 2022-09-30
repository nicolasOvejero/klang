import Dropdown, { DropdownOption } from '../dropdown/dropdown.component';
import moment from 'moment';
import 'moment/locale/fr';
import './input-date.style.scss';
import { ChangeEvent } from 'react';

type InputDateProps = {
    day: {
        value: string;
        formHasError: boolean;
        onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    },
    month: {
        value: string;
        formHasError: boolean;
        onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    },
    year: {
        value: string;
        formHasError: boolean;
        onChange: (event: ChangeEvent<HTMLSelectElement>) => void
    },
    startDateYear: number;
    endDateYear: number;
}

function InputDate(props: InputDateProps) {
    const arrayDays: DropdownOption[] =  [{
        value: '',
        label: ''
    }];
    setArrayValue(1, 31, arrayDays);
    const arrayMonth: DropdownOption[] = [{
        value: '',
        label: ''
    }];
    moment.months().forEach((month, index) => {
        arrayMonth.push({
            value: (index + 1).toString(),
            label: month
        });
    });
    const arrayYear: DropdownOption[] = [{
        value: '',
        label: ''
    }];
    setArrayValue(props.startDateYear, props.endDateYear, arrayYear);

    function setArrayValue(start: number, end: number, array: DropdownOption[]) {
        for (var i = start; i < end + 1; i++) {
            array.push({
                value: i.toString(),
                label: i.toString()
            });
        }
    }

    return (
        <div className='date-input'>
            <Dropdown
                label='Jour'
                {...(props.day)}
                name='day'
                required
                options={arrayDays}
            />
            <Dropdown
                label='Mois'
                {...(props.month)}
                name='month'
                required
                options={arrayMonth}
            />
            <Dropdown
                label='Année'
                {...(props.year)}
                name='year'
                required
                options={arrayYear}
            />
        </div>
    );
}

export default InputDate;
