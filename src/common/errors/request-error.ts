import { GraphQLError } from 'graphql';

export default class RequestError extends Error {
    errors: GraphQLError[];

    constructor(callType: string, errors: GraphQLError[]) {
        super(`Error during ${callType}`);

        this.errors = errors;

        Object.setPrototypeOf(this, RequestError.prototype);
    }
}
