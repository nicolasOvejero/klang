import { useState } from 'react';
import moment from 'moment';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import { useTranslation } from 'react-i18next';
import EventService from '../../../../common/services/event.service';
import { useGetEvents } from '../../../../hooks/useGetEvents';
import './event-form-confirm.style.scss';
import Loader from '../../../loader/loader.component';

const EventFormConfirm: React.FC = () => {
	const [success, setSuccess] = useState<boolean>(false);
	const [showToaster, setShowToaster] = useState<boolean>(false);
	const { t } = useTranslation();
	const currentDay = moment().format('YYYY-MM-DD');
	const { events, isLoading } = useGetEvents({
		filter: {
			published: {
				eq: false,
			},
			date: {
				ge: currentDay,
			},
		},
	});

	const handlerSubmit = async (eventId: string) => {
		try {
			await EventService.updateEvent({
				input: {
					id: eventId,
					published: true,
				},
			});

			setSuccess(true);
			setShowToaster(true);

			// getEvents();
		} catch (error: unknown) {
			setSuccess(false);
			setShowToaster(true);
		} finally {
			setTimeout(() => {
				setShowToaster(false);
			}, 2000);
		}
	};

	if (isLoading) {
		return <Loader></Loader>;
	}

	return (
		<div className='form-event-confirm'>
			<table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Date</th>
						<th>Ville</th>
						<th>Organisateur</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{events?.map((event) => {
						return (
							<tr key={event.id}>
								<td>{event.type}</td>
								<td>{moment(event.date).format('DD/MM/YYYY')}</td>
								<td>{event.address?.city}</td>
								<td>
									{event.createBy.firstname} {event.createBy.lastname}
								</td>
								<td>
									<Button
										label='Valider'
										type='button'
										clickHandler={() => handlerSubmit(event.id)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Toaster
				message={success ? t('admin.events.success-confirm') : t('admin.events.error-confirm')}
				type={success ? 'success' : 'error'}
				display={showToaster}
			/>
		</div>
	);
};

export default EventFormConfirm;
