import { useEffect, useState } from 'react';
import { EventModel } from '../models/event.model';
import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { listEvents, ListEventsQuery } from '../components/custom-queries';
import moment from 'moment';
import RequestError from '../common/errors/request-error';

export type UseGetEventsModel = {
	events: EventModel[];
	isLoading: boolean;
};

export const useGetEvents = (variables: object): UseGetEventsModel => {
	const [results, setResults] = useState<GraphQLResult<ListEventsQuery>>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(
			API.graphql({
				query: listEvents,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return {
			events: [],
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
			events: [],
			isLoading,
		};
	}

	const events = items.map((item) => ({
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
	}));

	return {
		events,
		isLoading,
	};
};
