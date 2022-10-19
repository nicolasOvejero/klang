// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { cleanup, Screen } from '@testing-library/react';
import { combineReducers } from 'redux';
import { authReducer } from './store/auth/auth.reducer';
import { langReducer } from './store/lang/lang.reducer';
import { userReducer } from './store/user/user.reducer';

afterEach(cleanup);

export function createTestStore() {
    const store = configureStore({
        reducer: combineReducers({
            auth: authReducer,
            user: userReducer,
            lang: langReducer,
        }),
        middleware: (_) => { return [] }
    });
    return store;
}

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
                language: 'fr'
            },
        };
    },
    withTranslation: () => (Component: { defaultProps: any; }) => {
        Component.defaultProps = {
            ...Component.defaultProps,
            t: () => '',
            i18n: {
                changeLanguage: () => new Promise(() => { }),
                language: 'fr'
            },
        };
        return Component;
    },
}));

export function getAllByTagName(tagName: string, screen: Screen) {
    return screen.getAllByText(
        (_, element) => element?.tagName.toLowerCase() === tagName
    );
}
export function getByTagName(tagName: string, screen: Screen) {
    return screen.getByText(
        (_, element) => element?.tagName.toLowerCase() === tagName
    );
}
