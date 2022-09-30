import './toaster.style.scss';

type ToasterProp = {
    message: string;
    type: 'success';
    display: boolean;
}

function Toaster(props: ToasterProp) {
    return (
        <div className={`toaster ${props.type} ${!props.display ? 'hidden' : ''}`}>
            {props.message}
        </div>
    )
}

export default Toaster;
