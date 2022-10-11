import { useNavigate } from 'react-router-dom';
import { NewArrivalModel } from '../../../routes/new-arrivals/new-arrivals.component';
import Button from '../../button/button.component';
import User from '../../user/user.component';
import moment from 'moment';
import './new-arrival-carousel.style.scss';

export type newArrivalsCarouselProps = {
    newArrivals: NewArrivalModel[];
}

function NewArrivalsCarousel(props: newArrivalsCarouselProps) {
    const navigate = useNavigate();
    const newArrivals = props.newArrivals.flatMap((newArrival) => {
        const users = newArrival.users.flat();

        users.forEach((user) => {
            user.arrivalDate = moment(newArrival.date).format('DD MMMM');
            user.background = 'bg-grey';
        });

        return users;
    })
    .sort((a, b) => moment(a.arrivalDate).diff(moment(b.arrivalDate)));
    ;

    return (
        <div className='container new-arrivals-carousel'>
            <h2 className='title'>
                Qui sont les <br />prochains arrivants ?
            </h2>
            <div className='content'>
                <div className='new-arrivals-container'>
                    {
                         newArrivals.map((newArrival) => {
                            return (
                                <User key={newArrival.id} user={newArrival}></User>
                            );
                        })
                    }
                </div>
            </div>
            <Button
                label="Voir plus de nouveaux arrivants"
                type='button'
                clickHandler={ () => navigate('new-arrivals') }
            ></Button>
        </div>
    );
}

export default NewArrivalsCarousel;
