import { useEffect, useState } from 'react';
import { EventModel } from '../models/event.model';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { getNextEvents, ListEventsQuery } from '../components/custom-queries';
import moment from 'moment';
import RequestError from '../common/errors/request-error';

export type UseGetNextEventModel = {
	event: EventModel | null;
	isLoading: boolean;
};

export const useGetNextEvent = (variables: object): UseGetNextEventModel => {
	const [results, setResults] = useState<GraphQLResult<ListEventsQuery>>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(
			API.graphql({
				query: getNextEvents,
				variables,
				authMode: 'AMAZON_COGNITO_USER_POOLS',
			}) as Promise<GraphQLResult<any>>
		)
			.then((apiData: GraphQLResult<ListEventsQuery>) => {
				setResults(apiData);
				setIsLoading(false);
			})
			//TODO Improve to return error
			.catch(() => {});
	}, []);

	if (isLoading) {
		return {
			event: null,
			isLoading,
		};
	}

	//TODO Improve to return error
	if (results.errors) {
		throw new RequestError('get next event', results.errors);
	}

	const items = results.data?.listEvents?.items;
	if (!items) {
		return {
			event: null,
			isLoading,
		};
	}

	const event = items
		.map((item) => ({
			id: item?.id || '',
			date: moment(item?.date).toDate(),
			image: item?.image || '',
			type: item?.type || '',
			address: {
				city: item?.address?.city || '',
				street: item?.address?.street || '',
			},
			schedule: item?.schedule || '',
			published: item?.published === undefined ? true : item?.published,
			createBy: {
				id: item?.createBy.id || '',
				lastname: item?.createBy.lastname || '',
				firstname: item?.createBy.firstname || '',
				image: item?.createBy.image || '',
			},
			participants: item?.participants?.items?.map((user) => {
				return {
					id: user?.user.id || '',
					lastname: user?.user.lastname || '',
					firstname: user?.user.firstname || '',
					image: user?.user.image || '',
				};
			}),
			description: item?.description || '',
		}))
		.sort((a, b) => moment(a?.date).diff(moment(b?.date)))
		.shift();

	return {
		event: event || null,
		isLoading,
	};
};
