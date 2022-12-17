import { useEffect, useState } from 'react';
import { NewArrivalModel } from '../models/new-arrivals.model';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { listNewArrivals, ListNewArrivalsQuery } from '../components/custom-queries';
import moment from 'moment';
import RequestError from '../common/errors/request-error';

export type UseGetNewArrivalsModel = {
	newArrivals: NewArrivalModel[];
	isLoading: boolean;
};

export const useGetNewArrivals = (variables: object): UseGetNewArrivalsModel => {
	const [results, setResults] = useState<GraphQLResult<ListNewArrivalsQuery>>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(
			API.graphql({
				query: listNewArrivals,
				variables,
				authMode: 'AMAZON_COGNITO_USER_POOLS',
			}) as Promise<GraphQLResult<any>>
		)
			.then((apiData: GraphQLResult<ListNewArrivalsQuery>) => {
				setResults(apiData);
				setIsLoading(false);
			})
			//TODO Improve to return error
			.catch(() => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return {
			newArrivals: [],
			isLoading,
		};
	}

	//TODO Improve to return error
	if (results.errors) {
		throw new RequestError('get new arrivals', results.errors);
	}

	const items = results?.data?.listNewArrivals?.items;
	if (!items) {
		return {
			newArrivals: [],
			isLoading,
		};
	}

	const newArrivals = items.map((item) => {
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
	});

	return {
		newArrivals,
		isLoading,
	};
};
