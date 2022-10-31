import HomeCarousel from '../../components/home-carousel/home-carousel.component';
import './home.style.scss';

const Home: React.FC = () => {
    return (
        <article className='body home'>
            <HomeCarousel />
        </article>
    );
}

export default Home;
