import { useNavigate } from 'react-router-dom';
import { NewArrivalModel } from '../../../routes/new-arrivals/new-arrivals.component';
import Button from '../../button/button.component';
import User from '../../user/user.component';
import moment from 'moment';
import { Trans, useTranslation } from 'react-i18next';
import './new-arrival-carousel.style.scss';

export type NewArrivalsCarouselProps = {
    newArrivals: NewArrivalModel[];
}

const NewArrivalsCarousel: React.FC<NewArrivalsCarouselProps> = (props: NewArrivalsCarouselProps) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    moment.updateLocale(i18n.language, {
        week: {
            dow: 1
        }
    });

    const newArrivals = props.newArrivals.flatMap((newArrival) => {
        const users = newArrival.users.flat();

        users.forEach((user) => {
            user.arrivalDate = moment(newArrival.date).format('DD MMMM');
            user.background = 'bg-grey';
        });

        return users;
    })
    .sort((a, b) => moment(a.arrivalDate, 'DD MMMM').diff(moment(b.arrivalDate, 'DD MMMM')));

    return (
        <div className='container new-arrivals-carousel hidden out-right'>
            <h2 className='title'>
                <Trans i18nKey='home.new-arrivals.title'>
                </Trans>
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
                label={t('home.new-arrivals.button')}
                type='button'
                clickHandler={ () => navigate('new-arrivals') }
            ></Button>
        </div>
    );
}

export default NewArrivalsCarousel;
