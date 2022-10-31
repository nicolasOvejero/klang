import './loader.style.scss';

const Loader: React.FC<{ size?: 'big'}> = ({ size }: { size?: 'big'}) => {
    return (
        <div className='loader-container'>
            <span className={`loader ${size ? size : ''}`}></span>
        </div>
    );
}

export default Loader;
