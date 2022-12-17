import { createBirthdayMutation } from './createBirthdayMutation';
import { getBirthdaysLightQuery } from '../../utils/birthday/getBirthdaysLight';

export const assertBirthdayId = async (date: string): Promise<string> => {
	const birthdays = await getBirthdaysLightQuery({
		filter: {
			date: {
				eq: date,
			},
		},
	});

	if (birthdays.length > 0) {
		return birthdays[0].id;
	}

	const newBirthday = await createBirthdayMutation({
		input: {
			date,
		},
	});

	if (!newBirthday?.id) {
		throw new Error('assert birthday id : can not create new birthday');
	}

	return newBirthday.id;
};
