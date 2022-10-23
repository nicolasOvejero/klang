import { API, graphqlOperation } from "aws-amplify";
import { listUsers, listUsersLight, ListUsersLightQuery, ListUsersQuery } from "../../components/custom-queries";
import { UserModel } from "../../components/user/user.component";
import RequestError from "../errors/request-error";
import { GraphQLResult } from "@aws-amplify/api";
import { createUser, createUsersEvents, updateUser } from "../../graphql/mutations";
import { CreateUserMutation, CreateUsersEventsMutation, UpdateUserMutation } from "../../API";

export default class UserService {
    static async getUsers(variables: object): Promise<UserModel[]> {
        const apiData = await API.graphql({
            query: listUsers,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListUsersQuery>;

        if (apiData.errors) {
            throw new RequestError('get users', apiData.errors);
        }

        const items = apiData.data?.listUsers?.items;
        if (!items) {
            return [];
        }

        return items.map((item) => {
            return {
                id: item.id,
                firstname: item.firstname,
                lastname: item.lastname || '',
                image: item.image || '',
                mail: item.mail,
                job: item.job || ''
            };
        });
    }

    static async getUserLight(variables: object): Promise<{ id: string, lastname?: string | null, firstname: string }[]> {
        const apiData = await API.graphql({
            query: listUsersLight,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListUsersLightQuery>;

        if (apiData.errors) {
            throw new RequestError('get users light', apiData.errors);
        }

        const items = apiData.data?.listUsers?.items;
        if (!items) {
            return [];
        }

        return items;
    }

    static async creatUser(variables: object): Promise<UserModel | undefined> {
        const apiData = await API.graphql({
            query: createUser,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<CreateUserMutation>;

        if (apiData.errors) {
            throw new RequestError('create user', apiData.errors);
        }

        const items = apiData.data?.createUser;
        if (!items || !apiData.data) {
            return undefined;
        }

        return {
            id: items.id,
            mail: items.mail,
            firstname: items.firstname,
            lastname: items.lastname || '',
            image: items.image || '',
            job: items.job || ''
        }
    }

    static async udpateUser(variables: object): Promise<UserModel | undefined> {
        const apiData = await API.graphql({
            query: updateUser,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<UpdateUserMutation>;

        if (apiData.errors) {
            throw new RequestError('update user', apiData.errors);
        }

        const items = apiData.data?.updateUser;
        if (!items || !apiData.data) {
            return undefined;
        }

        return {
            id: items.id,
            mail: items.mail,
            firstname: items.firstname,
            lastname: items.lastname || '',
            image: items.image || '',
            job: items.job || ''
        }
    }

    static async createUsersEvents(variables: object): Promise<{
        user: UserModel
    } | undefined> {
        const apiData = await API.graphql({
            query: createUsersEvents,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<CreateUsersEventsMutation>;

        if (apiData.errors) {
            throw new RequestError('delete event', apiData.errors);
        }

        const item = apiData.data?.createUsersEvents;
        if (!item) {
            return undefined;
        }

        return {
            user: {
                id: item.user.id,
                firstname: item.user.firstname,
                lastname: item.user.lastname || '',
                image: item.user.image || '',
                job: item.user.job || '',
            }
        }
    }

    static async bulkDeleteUsers(mutations: any): Promise<void> {
        const apiData = await API.graphql({
            ...graphqlOperation(`
                mutation batchMutation {
                    ${mutations}
                }
            `),
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult;

        if (apiData.errors) {
            throw new RequestError('bulk delete users', apiData.errors);
        }
    }
}
