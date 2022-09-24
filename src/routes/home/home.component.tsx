import { Fragment } from 'react';
import Navigation from '../navigation/navigation.component';
import './home.style.scss';
import Birthday from '../../components/birthday/birthday.component';

function Home() {
    return (
        <Fragment>
            <Navigation />
            <article>
                <Birthday />
            </article>
        </Fragment>
    );
}

export default Home;
