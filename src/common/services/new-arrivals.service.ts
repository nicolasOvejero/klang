import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { listNewArrivals, ListNewArrivalsQuery } from "../../components/custom-queries";
import RequestError from "../errors/request-error";
import moment from 'moment';
import { NewArrivalModel } from "../../routes/new-arrivals/new-arrivals.component";
import { createAddress, createNewArrivals } from "../../graphql/mutations";
import { CreateAddressMutation, CreateNewArrivalsMutation } from "../../API";
import { Address } from "../../components/admin/event-form/event-form-add/event-form-add.component";

export default class NewArrivalsService {
    static async getNewArrivals(variables: object): Promise<NewArrivalModel[]> {
        const apiData = await API.graphql({
            query: listNewArrivals,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListNewArrivalsQuery>;

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
                users: item.users?.items?.map((user) => {
                    return {
                        id: user?.id || '',
                        lastname: user?.lastname || '',
                        firstname: user?.firstname || '',
                        image: user?.image || '',
                        job: user?.job || '',
                    }
                }) || []
            }
        });
    }

    static async createAddress(variables: object): Promise<Address | undefined> {
        const apiData = await API.graphql({
            query: createAddress,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<CreateAddressMutation>;

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
            street: item.street
        }
    }

    static async createNewArrivals(variables: object): Promise<NewArrivalModel | undefined> {
        const apiData = await API.graphql({
            query: createNewArrivals,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<CreateNewArrivalsMutation>;

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
            users: item.users?.items?.map((user) => {
                return {
                    id: user?.id || '',
                    lastname: user?.lastname || '',
                    firstname: user?.firstname || '',
                    image: user?.image || '',
                    job: user?.job || '',
                }
            }) || []
        }
    }
}
