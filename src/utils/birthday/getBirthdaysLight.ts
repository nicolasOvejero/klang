import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import RequestError from '../../common/errors/request-error';
import { listBithdayLight, ListBirthdaysLightQuery } from '../../components/custom-queries';
import moment from 'moment';

export const getBirthdaysLightQuery = async (variables: object): Promise<{ id: string; date: Date }[]> => {
	const apiData = (await API.graphql({
		query: listBithdayLight,
		variables,
		authMode: 'AMAZON_COGNITO_USER_POOLS',
	})) as GraphQLResult<ListBirthdaysLightQuery>;

	if (apiData.errors) {
		throw new RequestError('get new arrivals', apiData.errors);
	}

	const items = apiData?.data?.listBirthdays?.items;
	if (!items) {
		return [];
	}

	return items.map((item) => ({
		id: item.id,
		date: moment(item.date).toDate(),
	}));
};
