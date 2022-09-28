/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress {
    onCreateAddress {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress {
    onUpdateAddress {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress {
    onDeleteAddress {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateUsersEvents = /* GraphQL */ `
  subscription OnCreateUsersEvents {
    onCreateUsersEvents {
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
export const onUpdateUsersEvents = /* GraphQL */ `
  subscription OnUpdateUsersEvents {
    onUpdateUsersEvents {
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
export const onDeleteUsersEvents = /* GraphQL */ `
  subscription OnDeleteUsersEvents {
    onDeleteUsersEvents {
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
