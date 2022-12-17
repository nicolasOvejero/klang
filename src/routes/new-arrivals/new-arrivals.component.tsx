import welcome from '../../assets/welcome.png';
import moment from 'moment';
import User from '../../components/user/user.component';
import Loader from '../../components/loader/loader.component';
import { Trans, useTranslation } from 'react-i18next';
import './new-arrivals.styls.scss';
import { useGetNewArrivals } from '../../hooks/useGetNewArrivals';

const NewArrivals: React.FC = () => {
	const { t } = useTranslation();

	const start = moment().startOf('week').format('DD MMMM');
	const end = moment().endOf('week').format('DD MMMM');
	const startReq = moment().startOf('week').format('YYYY-MM-DD');
	const endReq = moment().endOf('week').format('YYYY-MM-DD');

	const { newArrivals, isLoading } = useGetNewArrivals({
		filter: {
			date: {
				ge: startReq,
				le: endReq,
			},
		},
	});

	return (
		<article className='body new-arrivals'>
			<section className='title-container'>
				<h1 className='title'>{t('new-arrivals.title')}</h1>
			</section>
			<section className='new-arrivals-container'>
				<div className='new-arrivals-image'>
					<img
						alt='people with welcome banner'
						src={welcome}
					/>
				</div>
				<div className='new-arrivals-list'>
					<h3 className='calendar-title'>
						{t('new-arrivals.from')} {start} {t('new-arrivals.to')} {end}
					</h3>
					{isLoading && (
						<div className='calendar-position'>
							<Loader></Loader>
						</div>
					)}
					{!isLoading && newArrivals.length > 0 && (
						<ul className='list'>
							{newArrivals.map((arrival) => {
								const listItems: JSX.Element[] = [];
								const dateString = moment(arrival.date).format('DD MMMM');
								listItems.push(
									<li
										key={dateString}
										className='list-header'
									>
										{dateString}
									</li>
								);
								listItems.push(
									...arrival.users.map((user) => {
										user.size = 'medium';
										return (
											<li key={user.id}>
												<User user={user}></User>
											</li>
										);
									})
								);
								return listItems;
							})}
						</ul>
					)}
					{!isLoading && newArrivals.length === 0 && (
						<div className='no-new-arrivals'>
							<Trans i18nKey='new-arrivals.no-new'></Trans>
						</div>
					)}
				</div>
			</section>
		</article>
	);
};

export default NewArrivals;
