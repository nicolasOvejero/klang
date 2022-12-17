import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import RequestError from '../common/errors/request-error';
import { listUsers, ListUsersQuery } from '../components/custom-queries';
import { GraphQLResult } from '@aws-amplify/api';
import { UserModel } from '../models/user.model';

export type UseGetUsersLightModel = {
	users: UserModel[];
	isLoading: boolean;
};

export const useUseGetUsersLight = (variables: object): UseGetUsersLightModel => {
	const [results, setResults] = useState<GraphQLResult<ListUsersQuery>>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(
			API.graphql({
				query: listUsers,
				variables,
				authMode: 'AMAZON_COGNITO_USER_POOLS',
			}) as Promise<GraphQLResult<any>>
		)
			.then((apiData: GraphQLResult<ListUsersQuery>) => {
				setResults(apiData);
				setIsLoading(false);
			})
			//TODO Improve to return error
			.catch(() => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return {
			users: [],
			isLoading,
		};
	}

	//TODO Improve to return error
	if (results.errors) {
		throw new RequestError('get birthdays with user', results.errors);
	}

	const items = results.data?.listUsers?.items;
	if (!items) {
		return {
			users: [],
			isLoading: false,
		};
	}

	const users = items.map((item) => ({
		id: item.id,
		firstname: item.firstname,
		lastname: item.lastname || '',
		image: item.image || '',
		mail: item.mail || '',
		job: item.job || '',
	}));

	return {
		users,
		isLoading,
	};
};
