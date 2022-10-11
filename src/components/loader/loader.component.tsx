import './loader.style.scss';

function Loader({ size }: { size?: 'big'}) {
    return (
        <div className='loader-container'>
            <span className={`loader ${size ? size : ''}`}></span>
        </div>
    );
}

export default Loader;
