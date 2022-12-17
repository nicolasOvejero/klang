import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { listEventsLight, ListEventsLightQuery, subscriptionToEvent, SubscriptionToEventQuery } from '../../components/custom-queries';
import RequestError from '../errors/request-error';
import moment from 'moment';
import { createEvent, deleteEvent, updateEvent } from '../../graphql/mutations';
import { CreateEventMutation, DeleteEventMutation, UpdateEventMutation } from '../../API';
import { EventModel } from '../../models/event.model';

export default class EventService {
	static async getEventsLight(variables: object): Promise<ListEventsLightQuery | undefined> {
		const apiData = (await API.graphql({
			query: listEventsLight,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<ListEventsLightQuery>;

		if (apiData.errors) {
			throw new RequestError('get next event', apiData.errors);
		}

		const items = apiData.data;
		if (!items) {
			return undefined;
		}

		return items;
	}

	static async createEvent(variables: object): Promise<EventModel | undefined> {
		const apiData = (await API.graphql({
			query: createEvent,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<CreateEventMutation>;

		if (apiData.errors) {
			throw new RequestError('create event', apiData.errors);
		}

		const item = apiData.data?.createEvent;
		if (!item) {
			return undefined;
		}

		return {
			id: item.id,
			date: moment(item.date).toDate(),
			image: item.image,
			type: item.type,
			address: {
				city: item.address?.city,
				street: item.address?.street,
			},
			schedule: item.schedule,
			published: item.published === null || item.published === undefined ? true : item.published,
			createBy: {
				id: item.createBy?.id || '',
				lastname: item.createBy?.lastname || '',
				firstname: item.createBy?.firstname || '',
				image: item.createBy?.image || '',
			},
			description: item.description || '',
		};
	}

	static async updateEvent(variables: object): Promise<EventModel | undefined> {
		const apiData = (await API.graphql({
			query: updateEvent,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<UpdateEventMutation>;

		if (apiData.errors) {
			throw new RequestError('update event', apiData.errors);
		}

		const item = apiData.data?.updateEvent;
		if (!item || !apiData.data) {
			return undefined;
		}

		return {
			id: item.id,
			date: moment(item.date).toDate(),
			image: item.image,
			type: item.type,
			address: {
				city: item.address?.city,
				street: item.address?.street,
			},
			schedule: item.schedule,
			published: item.published === null || item.published === undefined ? true : item.published,
			createBy: {
				id: item.createBy?.id || '',
				lastname: item.createBy?.lastname || '',
				firstname: item.createBy?.firstname || '',
				image: item.createBy?.image || '',
			},
			description: item.description || '',
		};
	}

	static async deleteEvent(variables: object): Promise<void> {
		const apiData = (await API.graphql({
			query: deleteEvent,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<DeleteEventMutation>;

		if (apiData.errors) {
			throw new RequestError('delete event', apiData.errors);
		}
	}

	static async findSubscriptionByUserIdAndEventId(variables: object): Promise<string[]> {
		const apiData = (await API.graphql({
			query: subscriptionToEvent,
			variables,
			authMode: 'AMAZON_COGNITO_USER_POOLS',
		})) as GraphQLResult<SubscriptionToEventQuery>;

		if (apiData.errors) {
			throw new RequestError('find subscription by user ID and event ID', apiData.errors);
		}

		const items = apiData.data?.listUsersEvents?.items;
		if (!items) {
			return [];
		}

		return items.map((v) => v.id);
	}
}
