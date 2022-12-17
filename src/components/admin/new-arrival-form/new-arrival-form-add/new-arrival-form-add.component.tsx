import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import moment from 'moment';
import Dropdown from '../../../dropdown/dropdown.component';
import InputDate from '../../../input-date/input-date.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import NewArrivalsService from '../../../../common/services/new-arrivals.service';
import UserService from '../../../../common/services/user.service';
import { useTranslation } from 'react-i18next';
import { useUseGetUsersLight } from '../../../../hooks/useGetUsersLight';
import Loader from '../../../loader/loader.component';
import './new-arrival-form-add.style.scss';

const defaultNewArrivalsAddState = {
	user: '',
	day: '',
	month: '',
	year: '',
	formError: '',
	success: false,
};

const NewArrivalFormAdd: React.FC = () => {
	const [newArrivals, setNewArrivals] = useState(defaultNewArrivalsAddState);
	const { user, day, month, year, formError, success } = newArrivals;
	const { t } = useTranslation();

	const { users, isLoading } = useUseGetUsersLight({
		filter: {
			newArrivalsUsersId: {
				attributeExists: false,
			},
		},
	});

	const handleSelecteChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		setNewArrivals({
			...newArrivals,
			[name]: value,
			formError: '',
		});
	};

	const upsertNewArrival = async (date: string) => {
		const newArrivalsList = await NewArrivalsService.getNewArrivals({
			filter: {
				date: {
					eq: date,
				},
			},
		});

		if (newArrivalsList && newArrivalsList.length > 0) {
			return newArrivalsList[0];
		}

		const newNewArrivals = await NewArrivalsService.createNewArrivals({
			input: {
				date: date,
			},
		});

		return newNewArrivals;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!year || !month || !day || !user) {
			return;
		}

		const givenDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

		try {
			const newArrivalValue = await upsertNewArrival(givenDate);

			await UserService.udpateUser({
				input: {
					id: user,
					newArrivalsUsersId: newArrivalValue?.id,
				},
			});

			setNewArrivals({
				...defaultNewArrivalsAddState,
				success: true,
			});
			setTimeout(() => {
				setNewArrivals(defaultNewArrivalsAddState);
			}, 2000);
		} catch (error: unknown) {
			setNewArrivals({
				...newArrivals,
				formError: t('admin.new-arrivals.error'),
			});
		}
	};

	if (isLoading) {
		return <Loader></Loader>;
	}

	const usersMapped = [
		{
			value: '',
			label: '',
		},
	].concat(
		users.map((user) => {
			return {
				label: `${user.firstname} ${user.lastname}`,
				value: user.id,
			};
		})
	);

	return (
		<form
			className='form-newarrivals-add'
			onSubmit={handleSubmit}
		>
			<Dropdown
				label={t('admin.new-arrivals.who')}
				value={user}
				name='user'
				required
				haserror={formError !== ''}
				errormessage={formError}
				onChange={handleSelecteChange}
				options={usersMapped}
			/>
			<InputDate
				day={{ value: day, formHasError: formError !== '', onChange: handleSelecteChange }}
				month={{ value: month, formHasError: formError !== '', onChange: handleSelecteChange }}
				year={{ value: year, formHasError: formError !== '', onChange: handleSelecteChange }}
				startDateYear={moment().year()}
				endDateYear={moment().year() + 5}
			></InputDate>
			<Button
				label={t('admin.new-arrivals.save')}
				type='submit'
			/>
			<Toaster
				message={t('admin.new-arrivals.success')}
				type='success'
				display={success}
			/>
		</form>
	);
};

export default NewArrivalFormAdd;
