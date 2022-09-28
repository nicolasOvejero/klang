export const listUsers = /* GraphQL */ `
    query ListUsers(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
            mail
            lastname
            firstname
            image
            id
        }
        nextToken
        }
    }
`;

export const listBithday = /* GraphQL */ `
    query ListBirthday(
        $filter: ModelBirthdayFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listBirthdays(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
            date
            users {
                items {
                image
                lastname
                firstname
                }
            }
        }
        nextToken
        }
    }
`;

export type ListBirthdaysQuery = {
    listBirthdays?:  {
        __typename: "ModelBirthdayConnection",
        items:  Array< {
            __typename: "Birthday",
            id: string,
            date: string,
            users?: {
                __typename: "ModelUserConnection",
                items: Array<{
                    lastname?: string | null,
                    firstname: string,
                    image?: string | null,
                } | null>,
                nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
        } | null >,
        nextToken?: string | null,
    } | null,
};

export const listEvents = /* GraphQL */ `
    query ListEvents(
        $id: ID
        $filter: ModelEventFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
    ) {
        listEvents(
            id: $id
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
        ) {
            items {
                date
                image
                participants {
                    items {
                        user {
                            image
                            lastname
                            firstname
                        }
                    }
                }
                type
                address {
                    city
                    street
                }
                schedule
            }
            nextToken
        }
    }
`;

export type ListEventsQuery = {
    listEvents?:  {
        __typename: "ModelEventConnection",
        items:  Array< {
            __typename: "Event",
            id: string,
            date: string,
            image?: string | null,
            participants?:  {
                __typename: "ModelUsersEventsConnection",
                items: Array<{
                    user: {
                        lastname?: string | null,
                        firstname: string,
                        image?: string | null,
                    }
                } | null>
                nextToken?: string | null,
            } | null,
            type?: string | null,
            address?:  {
                __typename: "Address",
                city?: string | null,
                street?: string | null,
            } | null,
            schedule?: string | null,
        } | null >,
        nextToken?: string | null,
    } | null,
};