/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      mail
      lastname
      firstname
      image
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
        createdAt
        updatedAt
        birthdayUsersId
      }
      nextToken
    }
  }
`;
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
