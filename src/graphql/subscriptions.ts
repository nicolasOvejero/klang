/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBirthday = /* GraphQL */ `
  subscription OnCreateBirthday($filter: ModelSubscriptionBirthdayFilterInput) {
    onCreateBirthday(filter: $filter) {
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
export const onUpdateBirthday = /* GraphQL */ `
  subscription OnUpdateBirthday($filter: ModelSubscriptionBirthdayFilterInput) {
    onUpdateBirthday(filter: $filter) {
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
export const onDeleteBirthday = /* GraphQL */ `
  subscription OnDeleteBirthday($filter: ModelSubscriptionBirthdayFilterInput) {
    onDeleteBirthday(filter: $filter) {
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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onCreateAddress(filter: $filter) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress($filter: ModelSubscriptionAddressFilterInput) {
    onUpdateAddress(filter: $filter) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress($filter: ModelSubscriptionAddressFilterInput) {
    onDeleteAddress(filter: $filter) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateNewArrivals = /* GraphQL */ `
  subscription OnCreateNewArrivals(
    $filter: ModelSubscriptionNewArrivalsFilterInput
  ) {
    onCreateNewArrivals(filter: $filter) {
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
export const onUpdateNewArrivals = /* GraphQL */ `
  subscription OnUpdateNewArrivals(
    $filter: ModelSubscriptionNewArrivalsFilterInput
  ) {
    onUpdateNewArrivals(filter: $filter) {
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
export const onDeleteNewArrivals = /* GraphQL */ `
  subscription OnDeleteNewArrivals(
    $filter: ModelSubscriptionNewArrivalsFilterInput
  ) {
    onDeleteNewArrivals(filter: $filter) {
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
export const onCreateUsersEvents = /* GraphQL */ `
  subscription OnCreateUsersEvents(
    $filter: ModelSubscriptionUsersEventsFilterInput
  ) {
    onCreateUsersEvents(filter: $filter) {
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
export const onUpdateUsersEvents = /* GraphQL */ `
  subscription OnUpdateUsersEvents(
    $filter: ModelSubscriptionUsersEventsFilterInput
  ) {
    onUpdateUsersEvents(filter: $filter) {
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
export const onDeleteUsersEvents = /* GraphQL */ `
  subscription OnDeleteUsersEvents(
    $filter: ModelSubscriptionUsersEventsFilterInput
  ) {
    onDeleteUsersEvents(filter: $filter) {
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
