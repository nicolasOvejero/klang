import { InputHTMLAttributes } from 'react';
import '../../common/input.style.scss';

type FormInputProps = {
    label: string;
    haserror?: boolean;
    errormessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputForm({ label, haserror, errormessage, ...otherProps }: FormInputProps) {
    return (
        <label htmlFor={otherProps.name} className={`label ${ haserror ? 'error': ''}`}>
            <input className='input' {...otherProps} />
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
