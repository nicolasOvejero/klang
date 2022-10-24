/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createNewArrivals = /* GraphQL */ `
  mutation CreateNewArrivals(
    $input: CreateNewArrivalsInput!
    $condition: ModelNewArrivalsConditionInput
  ) {
    createNewArrivals(input: $input, condition: $condition) {
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
export const updateNewArrivals = /* GraphQL */ `
  mutation UpdateNewArrivals(
    $input: UpdateNewArrivalsInput!
    $condition: ModelNewArrivalsConditionInput
  ) {
    updateNewArrivals(input: $input, condition: $condition) {
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
export const deleteNewArrivals = /* GraphQL */ `
  mutation DeleteNewArrivals(
    $input: DeleteNewArrivalsInput!
    $condition: ModelNewArrivalsConditionInput
  ) {
    deleteNewArrivals(input: $input, condition: $condition) {
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
export const createUsersEvents = /* GraphQL */ `
  mutation CreateUsersEvents(
    $input: CreateUsersEventsInput!
    $condition: ModelUsersEventsConditionInput
  ) {
    createUsersEvents(input: $input, condition: $condition) {
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
export const updateUsersEvents = /* GraphQL */ `
  mutation UpdateUsersEvents(
    $input: UpdateUsersEventsInput!
    $condition: ModelUsersEventsConditionInput
  ) {
    updateUsersEvents(input: $input, condition: $condition) {
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
export const deleteUsersEvents = /* GraphQL */ `
  mutation DeleteUsersEvents(
    $input: DeleteUsersEventsInput!
    $condition: ModelUsersEventsConditionInput
  ) {
    deleteUsersEvents(input: $input, condition: $condition) {
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
