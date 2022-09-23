import logo from '../../assets/logo.png';
import Signin from '../../components/signin/signin.component';
import Signup from '../../components/signup/signup.component';
import './connection.style.scss';

function Connection() {
    return (
        <article className='connection'>
            <img
                className='logo'
                alt="logo"
                src={logo}
            />
            <section className='forms'>
                <Signin></Signin>
                {
/*
                    <hr className='separator' />
                    <Signup></Signup> 
*/
                }
            </section>
        </article>
    );
}

export default Connection;
