import './button.style.scss';

type ButtonProps = {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
}

function Button(props: ButtonProps) {
    return (
        <button
            type={props.type}
            className='button'
        >
            { props.label }
        </button>
    );
}

export default Button;
