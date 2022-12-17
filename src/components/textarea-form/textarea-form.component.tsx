import { FC, TextareaHTMLAttributes } from 'react';
import './textarea-form.style.scss';

type FormTextareaProps = {
	label: string;
	haserror?: boolean;
	errormessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaForm: FC<FormTextareaProps> = ({ label, haserror, errormessage, ...otherProps }) => {
	return (
		<>
			<label
				htmlFor={otherProps.name}
				className={`label-textarea ${haserror ? 'error' : ''}`}
			>
				<textarea
					className={`textarea ${haserror ? 'error' : ''}`}
					required
					onChange={otherProps.onChange}
					name='description'
					value={otherProps.value}
				/>
				<div className={`label-textarea-text ${otherProps.value ? 'filled' : ''}`}>{label}</div>
				{haserror && <div className='error-textarea'>{errormessage}</div>}
			</label>
		</>
	);
};

export default TextareaForm;
