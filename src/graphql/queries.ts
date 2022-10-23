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
          job
          city
          createdAt
          updatedAt
          birthdayUsersId
          newArrivalsUsersId
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
      published
      createBy {
        id
        mail
        lastname
        firstname
        image
        job
        events {
          nextToken
        }
        city
        createdAt
        updatedAt
        birthdayUsersId
        newArrivalsUsersId
      }
      createdAt
      updatedAt
      eventAddressId
      eventCreateById
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
        published
        createBy {
          id
          mail
          lastname
          firstname
          image
          job
          city
          createdAt
          updatedAt
          birthdayUsersId
          newArrivalsUsersId
        }
        createdAt
        updatedAt
        eventAddressId
        eventCreateById
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
      job
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
      city
      createdAt
      updatedAt
      birthdayUsersId
      newArrivalsUsersId
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
        job
        events {
          nextToken
        }
        city
        createdAt
        updatedAt
        birthdayUsersId
        newArrivalsUsersId
      }
      nextToken
    }
  }
`;
export const getNewArrivals = /* GraphQL */ `
  query GetNewArrivals($id: ID!) {
    getNewArrivals(id: $id) {
      id
      date
      users {
        items {
          id
          mail
          lastname
          firstname
          image
          job
          city
          createdAt
          updatedAt
          birthdayUsersId
          newArrivalsUsersId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
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
        published
        createBy {
          id
          mail
          lastname
          firstname
          image
          job
          city
          createdAt
          updatedAt
          birthdayUsersId
          newArrivalsUsersId
        }
        createdAt
        updatedAt
        eventAddressId
        eventCreateById
      }
      user {
        id
        mail
        lastname
        firstname
        image
        job
        events {
          nextToken
        }
        city
        createdAt
        updatedAt
        birthdayUsersId
        newArrivalsUsersId
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
          published
          createdAt
          updatedAt
          eventAddressId
          eventCreateById
        }
        user {
          id
          mail
          lastname
          firstname
          image
          job
          city
          createdAt
          updatedAt
          birthdayUsersId
          newArrivalsUsersId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
