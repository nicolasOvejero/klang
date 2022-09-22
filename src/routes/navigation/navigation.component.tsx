import logo from '../../assets/logo.png';
import './navigation.style.scss';

function Navigation() {
    return (
        <header className='header'>
            <img
                className='logo'
                alt="logo"
                src={logo}
            />
        </header>
    );
}

export default Navigation;
