import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { getNextEvents, listEvents, listEventsLight, ListEventsLightQuery, ListEventsQuery, subscriptionToEvent, SubscriptionToEventQuery } from "../../components/custom-queries";
import { EventModel } from "../../routes/event/event.component";
import RequestError from "../errors/request-error";
import moment from 'moment';
import { createEvent, deleteEvent } from "../../graphql/mutations";
import { CreateEventMutation, DeleteEventMutation } from "../../API";

export default class EventService {
    static async getNextEvent(variables: object): Promise<EventModel | undefined> {
        const apiData = await API.graphql({
            query: getNextEvents,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListEventsQuery>;

        if (apiData.errors) {
            throw new RequestError('get next event', apiData.errors);
        }

        const items = apiData.data?.listEvents?.items;
        if (!items) {
            return undefined;
        }

        return items.map((item) => {
            return {
                id: item?.id || '',
                date: moment(item?.date).toDate(),
                image: item?.image || '',
                type: item?.type || '',
                address: {
                    city: item?.address?.city || '',
                    street: item?.address?.street || '',
                },
                schedule: item?.schedule || '',
                published: item?.published || true,
                createBy: {
                    id: item?.createBy.id || '',
                    lastname: item?.createBy.lastname || '',
                    firstname: item?.createBy.firstname || '',
                    image: item?.createBy.image || ''
                },
                participants: item?.participants?.items?.map((user) => {
                    return {
                        id: user?.user.id || '',
                        lastname: user?.user.lastname || '',
                        firstname: user?.user.firstname || '',
                        image: user?.user.image || ''
                    }
                })
            }
        })[0];
    }

    static async getEvents(variables: object): Promise<EventModel[]> {
        const apiData = await API.graphql({
            query: listEvents,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListEventsQuery>;

        if (apiData.errors) {
            throw new RequestError('get next event', apiData.errors);
        }

        const items = apiData.data?.listEvents?.items;
        if (!items) {
            return [];
        }

        return items.map((item) => {
            return {
                id: item?.id || '',
                date: moment(item?.date).toDate(),
                image: item?.image || '',
                type: item?.type || '',
                address: {
                    city: item?.address?.city || '',
                    street: item?.address?.street || '',
                },
                schedule: item?.schedule || '',
                published: item?.published || true,
                createBy: {
                    id: item?.createBy.id || '',
                    lastname: item?.createBy.lastname || '',
                    firstname: item?.createBy.firstname || '',
                    image: item?.createBy.image || ''
                },
                participants: item?.participants?.items?.map((user) => {
                    return {
                        id: user?.user.id || '',
                        lastname: user?.user.lastname || '',
                        firstname: user?.user.firstname || '',
                        image: user?.user.image || ''
                    }
                })
            }
        });
    }

    static async getEventsLight(variables: object): Promise<ListEventsLightQuery | undefined> {
        const apiData = await API.graphql({
            query: listEventsLight,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListEventsLightQuery>;

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
        const apiData = await API.graphql({
            query: createEvent,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<CreateEventMutation>;

        if (apiData.errors) {
            throw new RequestError('create event', apiData.errors);
        }

        const items = apiData.data?.createEvent;
        if (!items || !apiData.data) {
            return undefined;
        }

        return {
            id: items.id,
            date: moment(items.date).toDate(),
            image: items.image,
            type: items.type,
            address: {
                city: items.address?.city,
                street: items.address?.street
            },
            schedule: items.schedule,
            published: items.published || false,
            createBy: {
                id: items.createBy?.id || '',
                lastname: items.createBy?.lastname || '',
                firstname: items.createBy?.firstname || '',
                image: items.createBy?.image || '',
            }
        }
    }

    static async deleteEvent(variables: object): Promise<void> {
        const apiData = await API.graphql({
            query: deleteEvent,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<DeleteEventMutation>;

        if (apiData.errors) {
            throw new RequestError('delete event', apiData.errors);
        }
    }

    static async findSubscriptionByUserIdAndEventId(variables: object): Promise<string[]> {
        const apiData = await API.graphql({
            query: subscriptionToEvent,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<SubscriptionToEventQuery>;

        if (apiData.errors) {
            throw new RequestError('find subscription by user ID and event ID', apiData.errors);
        }

        const items = apiData.data?.listUsersEvents.items;
        if (!items || !apiData.data) {
            return [];
        }

        return apiData.data.listUsersEvents.items.map((v) => v.id);
    }
}
