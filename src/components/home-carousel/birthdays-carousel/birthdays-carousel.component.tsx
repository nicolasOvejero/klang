import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../button/button.component';
import moment from 'moment';
import { UserModel } from '../../../models/user.model';
import User from '../../user/user.component';
import './birthdays-carousel.style.scss';

export type UserCarouselProps = {
	users: UserModel[];
};

const BirthdaysCarousel: React.FC<UserCarouselProps> = (props: UserCarouselProps) => {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	moment.updateLocale(i18n.language, {
		week: {
			dow: 1,
		},
	});
	const users = props.users;

	return (
		<div className='container hidden out-right'>
			<h2 className='title'>
				<Trans i18nKey='home.birthdays.title'></Trans>
			</h2>
			<div className='content'>
				<div className='users-container'>
					{users.map((user) => {
						user.background = 'bg-grey';
						return (
							<User
								key={user.id}
								user={user}
							></User>
						);
					})}
				</div>
			</div>
			<Button
				label={t('home.birthdays.button')}
				type='button'
				clickHandler={() => navigate('birthdays')}
			></Button>
		</div>
	);
};

export default BirthdaysCarousel;
