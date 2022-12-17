import moment from 'moment';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EventService from '../../../../common/services/event.service';
import NewArrivalsService from '../../../../common/services/new-arrivals.service';
import { Address } from '../../../../models/address.model';
import { selectUserReducer } from '../../../../store/user/user.selector';
import Button from '../../../button/button.component';
import InputDate from '../../../input-date/input-date.component';
import InputForm from '../../../input-form/input-form.component';
import TextareaForm from '../../../textarea-form/textarea-form.component';
import Toaster from '../../../toaster/toaster.component';
import './event-form-add.style.scss';

const defaultEventAddState = {
	image: '',
	type: '',
	address_city: '',
	address_street: '',
	day: '',
	month: '',
	year: '',
	schedule: '',
	description: '',
	formHasError: false,
	formError: '',
	success: false,
};

const EventFormAdd: React.FC = () => {
	const user = useSelector(selectUserReducer);
	const [eventAddState, setEventAddState] = useState(defaultEventAddState);
	const { image, type, schedule, address_city, address_street, day, month, year, description, formHasError, formError, success } = eventAddState;
	const { t } = useTranslation();

	const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setEventAddState({
			...eventAddState,
			[name]: value,
			formHasError: false,
			formError: '',
		});
	};

	const saveEvent = async (newAddress: Address) => {
		const formatedDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

		await EventService.createEvent({
			input: {
				image,
				type,
				schedule,
				description,
				date: formatedDate,
				eventAddressId: newAddress.id,
				published: false,
				eventCreateById: user.id,
			},
		});

		setEventAddState({
			...defaultEventAddState,
			success: true,
		});
		setTimeout(() => {
			setEventAddState(defaultEventAddState);
		}, 2000);
	};

	const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!image || !type || !schedule || !address_city || !address_street || !day || !month || !year || !description) {
			return;
		}

		try {
			const newAddress = await NewArrivalsService.createAddress({
				input: {
					city: address_city,
					street: address_street,
				},
			});

			newAddress && (await saveEvent(newAddress));
		} catch (error: unknown) {
			setEventAddState({
				...eventAddState,
				formHasError: true,
				formError: t('admin.birthdays.error'),
			});
		}
	};

	return (
		<form
			onSubmit={handlerSubmit}
			className='form-event-add'
		>
			<InputForm
				label={t('admin.events.image')}
				type='text'
				required
				onChange={handleChange}
				name='image'
				value={image}
				haserror={formError !== ''}
				errormessage={formError}
			/>
			<InputForm
				label={t('admin.events.type')}
				type='text'
				required
				onChange={handleChange}
				name='type'
				value={type}
				haserror={formError !== ''}
				errormessage={formError}
			/>
			<TextareaForm
				label={t('admin.events.description')}
				required
				onChange={handleChange}
				name='description'
				value={description}
				haserror={formError !== ''}
				errormessage={formError}
			/>
			<InputForm
				label={t('admin.events.schedule')}
				type='text'
				required
				onChange={handleChange}
				name='schedule'
				value={schedule}
				haserror={formError !== ''}
				errormessage={formError}
			/>
			<InputForm
				label={t('admin.events.city')}
				type='text'
				required
				onChange={handleChange}
				name='address_city'
				value={address_city}
				haserror={formError !== ''}
				errormessage={formError}
			/>
			<InputForm
				label={t('admin.events.street')}
				type='text'
				required
				onChange={handleChange}
				name='address_street'
				value={address_street}
				haserror={formError !== ''}
				errormessage={formError}
			/>
			<InputDate
				day={{ value: day, formHasError, onChange: handleChange }}
				month={{ value: month, formHasError, onChange: handleChange }}
				year={{ value: year, formHasError, onChange: handleChange }}
				startDateYear={moment().year()}
				endDateYear={moment().year() + 10}
			/>
			<Button
				label={t('admin.events.save')}
				type='submit'
			/>
			<Toaster
				message={t('admin.events.success')}
				type='success'
				display={success}
			/>
		</form>
	);
};

export default EventFormAdd;
