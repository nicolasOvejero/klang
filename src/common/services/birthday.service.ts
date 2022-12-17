import { API } from 'aws-amplify';
import { CreateBirthdayMutation } from '../../API';
import { ListBirthdaysLightQuery, listBithdayLight } from '../../components/custom-queries';
import { createBirthday } from '../../graphql/mutations';
import RequestError from '../errors/request-error';
import moment from 'moment';
import { GraphQLResult } from '@aws-amplify/api';
import { BirthdayModel } from '../../models/birthday.model';

export default class BirthdayService {
	static async getBirthdaysLight(variables: object): Promise<{ id: string; date: string }[]> {
		const apiData = (await API.graphql({
			query: listBithdayLight,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<ListBirthdaysLightQuery>;

		if (apiData.errors) {
			throw new RequestError('get birthdays light', apiData.errors);
		}

		const items = apiData.data?.listBirthdays?.items;
		if (!items) {
			return [];
		}

		return items;
	}

	static async createBirthday(variables: object): Promise<BirthdayModel | undefined> {
		const apiData = (await API.graphql({
			query: createBirthday,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<CreateBirthdayMutation>;

		if (apiData.errors) {
			throw new RequestError('create birthday', apiData.errors);
		}

		const items = apiData.data?.createBirthday;
		if (!items || !apiData.data) {
			return undefined;
		}

		return {
			id: items.id,
			date: moment(items.date).toDate(),
		};
	}

	static async assertBirthdayId(date: string): Promise<string> {
		const birthdays = await BirthdayService.getBirthdaysLight({
			filter: {
				date: {
					eq: date,
				},
			},
		});

		if (birthdays.length > 0) {
			return birthdays[0].id;
		} else {
			const newBirthday = await BirthdayService.createBirthday({
				input: {
					date,
				},
			});

			if (!newBirthday?.id) {
				throw new Error('assert birthday id : can not create new birthday');
			}

			return newBirthday.id;
		}
	}
}
