import { AnyAction } from "redux";
import { LANG_ACTION_TYPES } from "./lang.types";

export type LangState = {
    lang: string;
}

export const LANG_INITIAL_STATE = {
    lang: 'en',
}

export const langReducer = (
    state = LANG_INITIAL_STATE,
    action = {} as AnyAction
): LangState => {
    if (action.type === LANG_ACTION_TYPES.SET_LANG) {
        return {
            ...action.payload,
        };
    }
    return state;
};
