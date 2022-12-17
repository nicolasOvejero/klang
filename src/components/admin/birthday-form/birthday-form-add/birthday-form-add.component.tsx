import { ChangeEvent, FormEvent, useState } from 'react';
import Dropdown from '../../../dropdown/dropdown.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import InputDate from '../../../input-date/input-date.component';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useUseGetUsersLight } from '../../../../hooks/useGetUsersLight';
import Loader from '../../../loader/loader.component';
import { useUpdateUser } from '../../../../hooks/useUpdateUser';
import './birthday-form-add.style.scss';
import { assertBirthdayId } from '../../../../utils/birthday/assertBirthdayId';

const defaultBirthdayAddState = {
	user: '',
	day: '',
	month: '',
	year: '',
	formHasError: false,
	formError: '',
	success: false,
};

const BirthdayFormAdd: React.FC = () => {
	const [birthdayAddState, setBirthdayAddState] = useState(defaultBirthdayAddState);
	const { user, day, month, year, formHasError, formError, success } = birthdayAddState;

	const { t } = useTranslation();
	const { updateUser, isLoading: isLoadingUpdate } = useUpdateUser();
	const { users, isLoading } = useUseGetUsersLight(
		{
			filter: {
				birthdayUsersId: {
					attributeExists: false,
				},
			},
		},
		isLoadingUpdate
	);

	const handleSelecteChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		setBirthdayAddState({
			...birthdayAddState,
			[name]: value,
			formHasError: false,
			formError: '',
		});
	};

	const saveNewBirthdayToUser = async (birthdayId: string | undefined) => {
		await updateUser({
			input: {
				id: user,
				birthdayUsersId: birthdayId,
			},
		});

		setBirthdayAddState({
			...defaultBirthdayAddState,
			success: true,
		});
		setTimeout(() => {
			setBirthdayAddState(defaultBirthdayAddState);
		}, 2000);
	};

	const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!user || !day || !month || !year) {
			return;
		}

		try {
			const formatedDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
			const birthdayId = await assertBirthdayId(formatedDate);
			await saveNewBirthdayToUser(birthdayId);
		} catch (error: unknown) {
			setBirthdayAddState({
				...birthdayAddState,
				formHasError: true,
				formError: t('admin.birthdays.error'),
			});
		}
	};

	if (isLoading || isLoadingUpdate) {
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
			onSubmit={handlerSubmit}
			className='form-birthday-add'
		>
			<Dropdown
				label={t('admin.birthdays.who')}
				value={user}
				name='user'
				required
				haserror={formHasError}
				errormessage={formError}
				onChange={handleSelecteChange}
				options={usersMapped}
			/>
			<InputDate
				day={{ value: day, formHasError, onChange: handleSelecteChange }}
				month={{ value: month, formHasError, onChange: handleSelecteChange }}
				year={{ value: year, formHasError, onChange: handleSelecteChange }}
				startDateYear={1950}
				endDateYear={moment().year()}
			></InputDate>
			<Button
				label={t('admin.birthdays.save')}
				type='submit'
			/>
			<Toaster
				message={t('admin.birthdays.success')}
				type='success'
				display={success}
			/>
		</form>
	);
};

export default BirthdayFormAdd;
