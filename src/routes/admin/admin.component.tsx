import { Outlet, useMatch } from 'react-router-dom';
import AsideAction from '../../components/admin/aside-action/aside-action.component';
import defaultBackground from '../../assets/admin-bg.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevDown } from '../../assets/icons/chevron-down.svg';
import { useSelector } from 'react-redux';
import { selectAuthReducer } from '../../store/auth/auth.selector';
import './admin.style.scss';

const Admin: React.FC = () => {
	const auth = useSelector(selectAuthReducer);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { t } = useTranslation();
	const isMatchUsers = useMatch('/admin/users/*');
	const isMatchBirthday = useMatch('/admin/birthdays/*');
	const isMatchEvents = useMatch('/admin/events/*');
	const isMatchNewArrivals = useMatch('/admin/new-arrivals/*');
	const activeRoute = isMatchUsers || isMatchBirthday || isMatchEvents || isMatchNewArrivals;
	const fullAdmin = auth.user?.groups?.includes('admin');
	const eventCreation = auth.user?.groups?.includes('eventCreation');
	const eventValidation = auth.user?.groups?.includes('eventValidation');

	return (
		<article className='admin'>
			<aside className='menu'>
				{fullAdmin && (
					<AsideAction
						title={t('admin.menu.birthdays')}
						pathAdd='/admin/birthdays/add'
						color='primary'
					></AsideAction>
				)}
				<AsideAction
					title={t('admin.menu.events')}
					pathAdd={fullAdmin || eventCreation ? '/admin/events/add' : undefined}
					pathDelete={fullAdmin ? '/admin/events/delete' : undefined}
					pathConfirm={fullAdmin || eventValidation ? '/admin/events/confirm' : undefined}
					color='secondary'
				></AsideAction>
				{fullAdmin && (
					<AsideAction
						title={t('admin.menu.new-arrivals')}
						pathAdd='/admin/new-arrivals/add'
						color='primary'
					></AsideAction>
				)}
			</aside>
			<section className='menu-mobile'>
				<div
					className='header'
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<p className='title'>Menu</p>
					<ChevDown className={`icon ${isMobileMenuOpen ? 'expanded' : ''}`} />
				</div>
				<div className={`content ${isMobileMenuOpen ? 'expand' : ''}`}>
					{fullAdmin && (
						<AsideAction
							title={t('admin.menu.birthdays')}
							pathAdd='/admin/birthdays/add'
							color='primary'
							handleClickItem={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						></AsideAction>
					)}
					<AsideAction
						title={t('admin.menu.events')}
						pathAdd={fullAdmin || eventCreation ? '/admin/events/add' : undefined}
						pathDelete={fullAdmin ? '/admin/events/delete' : undefined}
						pathConfirm={fullAdmin || eventValidation ? '/admin/events/confirm' : undefined}
						color='secondary'
					></AsideAction>
					{fullAdmin && (
						<AsideAction
							title={t('admin.menu.new-arrivals')}
							pathAdd='/admin/new-arrivals/add'
							color='primary'
							handleClickItem={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						></AsideAction>
					)}
				</div>
			</section>
			{activeRoute && <Outlet />}
			{!activeRoute && (
				<section className='default-background'>
					<img
						src={defaultBackground}
						alt='default background admin'
					/>
				</section>
			)}
		</article>
	);
};

export default Admin;
