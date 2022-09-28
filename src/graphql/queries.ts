/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBirthday = /* GraphQL */ `
  query GetBirthday($id: ID!) {
    getBirthday(id: $id) {
      id
      date
      users {
        items {
          id
          mail
          lastname
          firstname
          image
          createdAt
          updatedAt
          birthdayUsersId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBirthdays = /* GraphQL */ `
  query ListBirthdays(
    $id: ID
    $filter: ModelBirthdayFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBirthdays(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const listAddresses = /* GraphQL */ `
  query ListAddresses(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        city
        street
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      date
      image
      participants {
        items {
          id
          eventID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      address {
        id
        city
        street
        createdAt
        updatedAt
      }
      schedule
      createdAt
      updatedAt
      eventAddressId
    }
  }
`;
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
          nextToken
        }
        type
        address {
          id
          city
          street
          createdAt
          updatedAt
        }
        schedule
        createdAt
        updatedAt
        eventAddressId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      mail
      lastname
      firstname
      image
      events {
        items {
          id
          eventID
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      birthdayUsersId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        mail
        lastname
        firstname
        image
        events {
          nextToken
        }
        createdAt
        updatedAt
        birthdayUsersId
      }
      nextToken
    }
  }
`;
export const getUsersEvents = /* GraphQL */ `
  query GetUsersEvents($id: ID!) {
    getUsersEvents(id: $id) {
      id
      eventID
      userID
      event {
        id
        date
        image
        participants {
          nextToken
        }
        type
        address {
          id
          city
          street
          createdAt
          updatedAt
        }
        schedule
        createdAt
        updatedAt
        eventAddressId
      }
      user {
        id
        mail
        lastname
        firstname
        image
        events {
          nextToken
        }
        createdAt
        updatedAt
        birthdayUsersId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsersEvents = /* GraphQL */ `
  query ListUsersEvents(
    $filter: ModelUsersEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventID
        userID
        event {
          id
          date
          image
          type
          schedule
          createdAt
          updatedAt
          eventAddressId
        }
        user {
          id
          mail
          lastname
          firstname
          image
          createdAt
          updatedAt
          birthdayUsersId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
