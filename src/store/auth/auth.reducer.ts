import { AnyAction } from "redux";
import { AUTH_ACTION_TYPES } from "./auth.types";

export type AuthState = {
    isConnected: boolean;
    user: any;
}

export const AUTH_INITIAL_STATE = {
    isConnected: false,
    user: null
}

export const authReducer = (
    state = AUTH_INITIAL_STATE,
    action = {} as AnyAction
): AuthState => {
    if (action.type === AUTH_ACTION_TYPES.SET_AUTH) {
        console.log('state', state, action);
        return {
            ...action.payload,
        };
    }

    return state;
};
