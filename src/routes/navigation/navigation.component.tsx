import { Auth } from 'aws-amplify';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Button from '../../components/button/button.component';
import LangSelector from '../../components/lang-selector/lang-selector.component';
import MobileMenu from '../../components/mobile/menu/menu.component';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import { AUTH_ACTION_TYPES } from '../../store/auth/auth.types';
import { USER_INITIAL_STATE } from '../../store/user/user.reducer';
import { USER_ACTION_TYPES } from '../../store/user/user.types';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import './navigation.style.scss';

const Navigation: React.FC = () => {
	const auth = useSelector(selectAuthReducer);
	const { t } = useTranslation();
	const [menuOpen, setMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAdmin =
		auth.user?.groups?.includes('admin') ||
		auth.user?.groups?.includes('eventCreation') ||
		auth.user?.groups?.includes('eventValidation') ||
		false;

	async function signOut() {
		try {
			await Auth.signOut();
			dispatch({
				type: AUTH_ACTION_TYPES.SET_AUTH,
				payload: {
					isConnected: false,
					user: null,
				},
			});
			dispatch({
				type: USER_ACTION_TYPES.SET_USER,
				payload: USER_INITIAL_STATE,
			});
		} catch (error) {
			console.error('error signing out: ', error);
		}
	}

	return (
		<Fragment>
			<header className='navigation header'>
				<Menu
					className='manu-icon'
					onClick={() => setMenuOpen(true)}
				/>
				<img
					onClick={() => navigate('/')}
					className='logo'
					alt='logo'
					src={logo}
				/>
				<div className='identity'>
					{isAdmin && (
						<Button
							label={t('header.admin')}
							type='button'
							clickHandler={() => navigate('/admin')}
						></Button>
					)}
					<Button
						label={t('header.profile')}
						type='button'
						clickHandler={() => navigate('/profile')}
					></Button>
					<Button
						label={t('header.logout')}
						type='button'
						clickHandler={signOut}
					></Button>
					<LangSelector />
				</div>
			</header>
			<MobileMenu
				isOpen={menuOpen}
				isAdmin={isAdmin}
				closeMenu={() => setMenuOpen(false)}
				signOut={() => signOut()}
			/>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
