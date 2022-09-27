/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateBirthday = /* GraphQL */ `
  subscription OnCreateBirthday {
    onCreateBirthday {
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
export const onUpdateBirthday = /* GraphQL */ `
  subscription OnUpdateBirthday {
    onUpdateBirthday {
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
export const onDeleteBirthday = /* GraphQL */ `
  subscription OnDeleteBirthday {
    onDeleteBirthday {
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
