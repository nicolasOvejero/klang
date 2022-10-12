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
        }
        nextToken
        }
    }
`;

export type ListUsersQuery = {
    listUsers?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
            __typename: "User",
            mail: string,
            lastname?: string | null,
            firstname: string,
            image?: string | null,
        }>,
        nextToken?: string | null,
    } | null,
};

export const listUsersLight = /* GraphQL */ `
    query ListUsers(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
            id
            lastname
            firstname
        }
        nextToken
        }
    }
`;

export type ListUsersLightQuery = {
    listUsers?:  {
        __typename: "ModelUserConnection",
        items:  Array< {
            __typename: "User",
            id: string,
            lastname?: string | null,
            firstname: string,
        }>,
        nextToken?: string | null,
    } | null,
};

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
                    id
                    image
                    lastname
                    firstname
                    mail
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
                    id: string,
                    lastname?: string | null,
                    firstname: string,
                    image?: string | null,
                    mail: string,
                } | null>,
                nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
        } | null >,
        nextToken?: string | null,
    } | null,
};

export const listBithdayLight = /* GraphQL */ `
    query ListBirthday(
        $filter: ModelBirthdayFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listBirthdays(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                date
            }
            nextToken
        }
    }
`;

export type ListBirthdaysLightQuery = {
  listBirthdays?:  {
    __typename: "ModelBirthdayConnection",
    items:  Array< {
      __typename: "Birthday",
      id: string,
      date: string,
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
                id
                date
                image
                participants {
                    items {
                        user {
                            id
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

export const getNextEvents = /* GraphQL */ `
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
                id
                date
                image
                participants(limit: 4) {
                    items {
                        user {
                            id
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
                        id: string,
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

export const listEventsLight = /* GraphQL */ `
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
                id
                date
                type
                participants {
                    items {
                        id
                        user {
                            id
                        }
                    }
                }
            }
            nextToken
        }
    }
`;

export type ListEventsLightQuery = {
    listEvents?:  {
        __typename: "ModelEventConnection",
        items:  Array< {
            __typename: "Event",
            id: string,
            date: string,
            type?: string | null,
            participants?:  {
                __typename: "ModelUsersEventsConnection",
                items: Array<{
                    id: string,
                    user: {
                        id: string,
                    }
                } | null>
                nextToken?: string | null,
            } | null,
        } | null >,
        nextToken?: string | null,
    } | null,
};

export const listNewArrivals = /* GraphQL */ `
  query ListNewArrivals(
    $id: ID
    $filter: ModelNewArrivalsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNewArrivals(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        date
        users {
            items {
                id
                image
                lastname
                firstname
                job
            }
        }
      }
      nextToken
    }
  }
`;

export type ListNewArrivalsQuery = {
  listNewArrivals?:  {
    __typename: "ModelNewArrivalsConnection",
    items:  Array< {
      __typename: "NewArrivals",
      date: string,
      users?:  {
        __typename: "ModelUserConnection",
        items: Array<{
            id: string,
            lastname?: string | null,
            firstname: string,
            image?: string | null,
            job?: string | null,
        } | null>
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export const subscriptionToEvent = /* GraphQL */ `
  query SubscriptionToEvent(
    $filter: ModelUsersEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
          id
      }
      nextToken
    }
  }
`;

export type SubscriptionToEventQuery = {
  listUsersEvents:  {
    items:  Array< {
        id: string,
    }>,
  },
};
