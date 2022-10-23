import { API } from "aws-amplify";
import { CreateBirthdayMutation } from "../../API";
import { ListBirthdaysLightQuery, ListBirthdaysQuery, listBithday, listBithdayLight } from "../../components/custom-queries";
import { createBirthday } from "../../graphql/mutations";
import { BirthdayModel } from "../../routes/birthday/birthday.component";
import RequestError from "../errors/request-error";
import moment from 'moment';
import { GraphQLResult } from "@aws-amplify/api";

export default class BirthdayService {
    static async getBirthdays(variables: object): Promise<BirthdayModel[]> {
        const apiData = await API.graphql({
            query: listBithday,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListBirthdaysQuery>;

        if (apiData.errors) {
            throw new RequestError('get birthdays with user', apiData.errors);
        }

        const items = apiData.data?.listBirthdays?.items;
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
                        mail: user?.mail || '',
                    }
                })
            }
        });
    }

    static async getBirthdaysLight(variables: object): Promise<{ id: string, date: string }[]> {
        const apiData = await API.graphql({
            query: listBithdayLight,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<ListBirthdaysLightQuery>;

        if (apiData.errors) {
            throw new RequestError('get birthdays light', apiData.errors);
        }

        const items = apiData.data?.listBirthdays?.items;
        if (!items) {
            return [];
        }

        return items;
    }

    static async createBirthday(variables: object): Promise<BirthdayModel | undefined> {
        const apiData = await API.graphql({
            query: createBirthday,
            variables,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        }) as GraphQLResult<CreateBirthdayMutation>;

        if (apiData.errors) {
            throw new RequestError('create birthday', apiData.errors);
        }

        const items = apiData.data?.createBirthday;
        if (!items || !apiData.data) {
            return undefined;
        }

        return {
            id: items.id,
            date: moment(items.date).toDate()
        }
    }
}
