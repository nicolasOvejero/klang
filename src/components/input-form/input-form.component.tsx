import { InputHTMLAttributes } from 'react';
import './input-form.style.scss';

type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputForm({ label, ...otherProps }: FormInputProps) {
    return (
        <label className='label'>
            <input className='input' {...otherProps} />
            <div className={`label-text ${otherProps.value ? 'filled' : ''}`}>
                {label}
            </div>
        </label>
    );
}

export default InputForm;
