import './toaster.style.scss';

type ToasterProp = {
    message: string;
    type: 'success' | 'error';
    display: boolean;
}

const Toaster: React.FC<ToasterProp> = (props: ToasterProp) => {
    return (
        <div className={`toaster ${props.type} ${!props.display ? 'hidden' : ''}`}>
            {props.message}
        </div>
    )
}

export default Toaster;
