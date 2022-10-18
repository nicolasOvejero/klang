import { FC, InputHTMLAttributes } from 'react';
import '../../common/input.style.scss';

type FormInputProps = {
    label: string;
    haserror?: boolean;
    errormessage?: string;
    icon?: FC;
} & InputHTMLAttributes<HTMLInputElement>;

function InputForm({ label, haserror, errormessage, ...otherProps }: FormInputProps) {
    return (
        <label htmlFor={otherProps.name} className={`label ${haserror ? 'error' : ''}`}>
            {
                otherProps.icon && <otherProps.icon/>
            }
            <input className='input' id={ otherProps.name } {...otherProps} />
            <div className={`label-text ${otherProps.value ? 'filled' : ''}`}>
                {label}
            </div>
            {
                haserror &&
                <div className='error-text'>
                    {errormessage}
                </div>
            }
        </label>
    );
}

export default InputForm;
