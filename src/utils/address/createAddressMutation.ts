import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import RequestError from '../../common/errors/request-error';
import { createAddress } from '../../graphql/mutations';
import { CreateAddressMutation } from '../../API';
import { Address } from '../../models/address.model';

export const createAddressMutation = async (variables: object): Promise<Address | undefined> => {
	const apiData = (await API.graphql({
		query: createAddress,
		variables,
		authMode: 'AMAZON_COGNITO_USER_POOLS',
	})) as GraphQLResult<CreateAddressMutation>;

	if (apiData.errors) {
		throw new RequestError('create address', apiData.errors);
	}

	const item = apiData.data?.createAddress;
	if (!item) {
		return undefined;
	}

	return {
		id: item.id,
		city: item.city,
		street: item.street,
	};
};
