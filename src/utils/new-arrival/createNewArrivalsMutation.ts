import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { createNewArrivals } from '../../graphql/mutations';
import { CreateNewArrivalsMutation } from '../../API';
import { NewArrivalModel } from '../../models/new-arrivals.model';
import moment from 'moment';
import RequestError from '../../common/errors/request-error';

export const createNewArrivalsMutation = async (variables: object): Promise<NewArrivalModel | undefined> => {
	const apiData = (await API.graphql({
		query: createNewArrivals,
		variables,
		authMode: 'AMAZON_COGNITO_USER_POOLS',
	})) as GraphQLResult<CreateNewArrivalsMutation>;

	if (apiData.errors) {
		throw new RequestError('delete event', apiData.errors);
	}

	const item = apiData.data?.createNewArrivals;
	if (!item) {
		return undefined;
	}

	return {
		id: item.id,
		date: moment(item.date).toDate(),
		users:
			item.users?.items?.map((user) => {
				return {
					id: user?.id || '',
					lastname: user?.lastname || '',
					firstname: user?.firstname || '',
					image: user?.image || '',
					job: user?.job || '',
				};
			}) || [],
	};
};
