import { AnyAction } from "redux";
import { USER_ACTION_TYPES } from "./user.types";

export type UserState = {
    id: string;
    firstname: string;
    lastname: string;
    mail: string;
    city: string;
    image?: string;
    job?: string;
}

export const USER_INITIAL_STATE = {
    id: '',
    firstname: '',
    lastname: '',
    mail: '',
    city: '',
    image: undefined,
    job: undefined,
}

export const userReducer = (
    state = USER_INITIAL_STATE,
    action = {} as AnyAction
): UserState => {
    if (action.type === USER_ACTION_TYPES.SET_USER) {
        return {
            ...action.payload,
        };
    }
    return state;
};
