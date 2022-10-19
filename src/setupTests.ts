// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { cleanup, Screen } from '@testing-library/react';

const mockStore = configureStore();

afterEach(cleanup);

export default mockStore;

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    withTranslation: () => (Component: { defaultProps: any; }) => {
        Component.defaultProps = {
            ...Component.defaultProps,
            t: () => ""
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
