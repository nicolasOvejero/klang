import { AnyAction } from "redux";
import { AUTH_ACTION_TYPES } from "./auth.types";

export type AuthUserState = {
    username: string;
    mail: string;
    emailVerified: boolean;
    token: string;
}

export type AuthState = {
    isConnected: boolean;
    user: AuthUserState | null;
    tempUser: any | null;
}

export const AUTH_INITIAL_STATE = {
    isConnected: false,
    user: null,
    tempUser: null
}

export const authReducer = (
    state = AUTH_INITIAL_STATE,
    action = {} as AnyAction
): AuthState => {
    if (action.type === AUTH_ACTION_TYPES.SET_AUTH) {
        return {
            ...action.payload,
            tempUser: null,
        };
    }

    if (action.type === AUTH_ACTION_TYPES.SET_TEMP_AUTH) {
        return {
            ...action.payload,
        };
    }

    return state;
};
