import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import RequestError from '../../common/errors/request-error';
import { listNewArrivalsLight, ListNewArrivalsLightQuery } from '../../components/custom-queries';
import { NewArrivalModel } from '../../models/new-arrivals.model';
import moment from 'moment';

export const getNewArrivalsLight = async (variables: object): Promise<NewArrivalModel[]> => {
	const apiData = (await API.graphql({
		query: listNewArrivalsLight,
		variables,
		authMode: 'AMAZON_COGNITO_USER_POOLS',
	})) as GraphQLResult<ListNewArrivalsLightQuery>;

	if (apiData.errors) {
		throw new RequestError('get new arrivals', apiData.errors);
	}

	const items = apiData?.data?.listNewArrivals?.items;
	if (!items) {
		return [];
	}

	return items.map((item) => {
		return {
			id: item.id,
			date: moment(item.date).toDate(),
			users: [],
		};
	});
};
