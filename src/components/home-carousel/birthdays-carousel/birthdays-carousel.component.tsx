import { useNavigate } from 'react-router-dom';
import Button from '../../button/button.component';
import User, { UserModel } from '../../user/user.component';
import './birthdays-carousel.style.scss';

export type userCarouselProps = {
    users: UserModel[];
}

function BirthdaysCarousel(props: userCarouselProps) {
    const navigate = useNavigate();
    const users = props.users;

    return (
        <div className='container'>
            <h2 className='title'>
                Quels sont les<br />prochains anniversaires ?
            </h2>
            <div className='content'>
                <div className='users-container'>
                    {
                        users.map((user) => {
                            user['background'] = 'bg-grey';
                            return (
                                <User key={user.id} user={user}></User>
                            );
                        })
                    }
                </div>
            </div>
            <Button
                label='Souhaite leur un joyeux anniversaire'
                type='button'
                clickHandler={ () => navigate('birthdays') }
            ></Button>
        </div>
    )
}

export default BirthdaysCarousel;
