import { SelectHTMLAttributes } from 'react';
import '../../common/input.style.scss';

export type DropdownOption = {
    value: string;
    label: string;
}

type DropdownProps = {
    label: string;
    options: DropdownOption[];
    haserror?: boolean;
    errormessage?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
    return (
        <label htmlFor={props.name} className={`label ${ props.haserror ? 'error': ''}`}>
            <select
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                required={props.required}
            >
                {
                    props.options.map((item) => {
                        return (
                            <option
                                key={item.value}
                                value={item.value}>
                                {item.label}
                            </option>
                        )
                    })
                }
            </select>
            <div className={`label-text ${props.value ? 'filled' : ''}`}>
                {props.label}
            </div>
            {
                props.haserror &&
                <div className='error-text'>
                    {props.errormessage}
                </div>
            }
        </label>
    )
}

export default Dropdown;
