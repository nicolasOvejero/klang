import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import RequestError from '../common/errors/request-error';
import { ListBirthdaysQuery, listBithday } from '../components/custom-queries';
import { BirthdayModel } from '../models/birthday.model';
import { GraphQLResult } from '@aws-amplify/api';
import moment from 'moment';

export type UseGetBirthdays = {
	birthdays: BirthdayModel[];
	isLoading: boolean;
};

export const useGetBirthdays = (variables: object): UseGetBirthdays => {
	const [results, setResults] = useState<GraphQLResult<ListBirthdaysQuery>>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(
			API.graphql({
				query: listBithday,
				variables,
				authMode: 'AMAZON_COGNITO_USER_POOLS',
			}) as Promise<GraphQLResult<any>>
		)
			.then((apiData: GraphQLResult<ListBirthdaysQuery>) => {
				setResults(apiData);
				setIsLoading(false);
			})
			//TODO Improve to return error
			.catch(() => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return {
			birthdays: [],
			isLoading,
		};
	}

	//TODO Improve to return error
	if (results.errors) {
		throw new RequestError('get birthdays with user', results.errors);
	}

	const items = results.data?.listBirthdays?.items;
	if (!items) {
		return {
			birthdays: [],
			isLoading: false,
		};
	}

	const birthdays = items.map((item) => {
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
						mail: user?.mail || '',
					};
				}) || [],
		};
	});

	return {
		birthdays,
		isLoading,
	};
};
