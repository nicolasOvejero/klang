import './button.style.scss';

type ButtonProps = {
    label: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    clickHandler?: () => {};
    color?: 'primary' | 'secondary';  
}

function Button(props: ButtonProps) {
    return (
        <button
            disabled={props.disabled}
            type={props.type}
            className={`button ${props.color ? props.color : ''}`}
            onClick={props.clickHandler}
        >
            { props.label }
        </button>
    );
}

export default Button;
