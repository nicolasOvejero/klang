/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createBirthday = /* GraphQL */ `
  mutation CreateBirthday(
    $input: CreateBirthdayInput!
    $condition: ModelBirthdayConditionInput
  ) {
    createBirthday(input: $input, condition: $condition) {
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
export const updateBirthday = /* GraphQL */ `
  mutation UpdateBirthday(
    $input: UpdateBirthdayInput!
    $condition: ModelBirthdayConditionInput
  ) {
    updateBirthday(input: $input, condition: $condition) {
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
export const deleteBirthday = /* GraphQL */ `
  mutation DeleteBirthday(
    $input: DeleteBirthdayInput!
    $condition: ModelBirthdayConditionInput
  ) {
    deleteBirthday(input: $input, condition: $condition) {
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
