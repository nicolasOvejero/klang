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
                    nextToken?: string | null,
                } | null>,
            } | null,
            createdAt: string,
            updatedAt: string,
        } | null >,
        nextToken?: string | null,
    } | null,
};
