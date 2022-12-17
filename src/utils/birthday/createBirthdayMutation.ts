import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import RequestError from '../../common/errors/request-error';
import moment from 'moment';
import { BirthdayModel } from '../../models/birthday.model';
import { CreateBirthdayMutation } from '../../API';
import { createBirthday } from '../../graphql/mutations';

export const createBirthdayMutation = async (variables: object): Promise<BirthdayModel | undefined> => {
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
};
