/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBirthdayInput = {
  id?: string | null,
  date: string,
};

export type ModelBirthdayConditionInput = {
  date?: ModelStringInput | null,
  and?: Array< ModelBirthdayConditionInput | null > | null,
  or?: Array< ModelBirthdayConditionInput | null > | null,
  not?: ModelBirthdayConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Birthday = {
  __typename: "Birthday",
  id: string,
  date: string,
  users?: ModelUserConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  mail: string,
  lastname?: string | null,
  firstname: string,
  image?: string | null,
  job?: string | null,
  events?: ModelUsersEventsConnection | null,
  createdAt: string,
  updatedAt: string,
  birthdayUsersId?: string | null,
  newArrivalsUsersId?: string | null,
};

export type ModelUsersEventsConnection = {
  __typename: "ModelUsersEventsConnection",
  items:  Array<UsersEvents | null >,
  nextToken?: string | null,
};

export type UsersEvents = {
  __typename: "UsersEvents",
  id: string,
  eventID: string,
  userID: string,
  event: Event,
  user: User,
  createdAt: string,
  updatedAt: string,
};

export type Event = {
  __typename: "Event",
  id: string,
  date: string,
  image?: string | null,
  participants?: ModelUsersEventsConnection | null,
  type?: string | null,
  address?: Address | null,
  schedule?: string | null,
  createdAt: string,
  updatedAt: string,
  eventAddressId?: string | null,
};

export type Address = {
  __typename: "Address",
  id: string,
  city?: string | null,
  street?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBirthdayInput = {
  id: string,
  date?: string | null,
};

export type DeleteBirthdayInput = {
  id: string,
};

export type CreateAddressInput = {
  id?: string | null,
  city?: string | null,
  street?: string | null,
};

export type ModelAddressConditionInput = {
  city?: ModelStringInput | null,
  street?: ModelStringInput | null,
  and?: Array< ModelAddressConditionInput | null > | null,
  or?: Array< ModelAddressConditionInput | null > | null,
  not?: ModelAddressConditionInput | null,
};

export type UpdateAddressInput = {
  id: string,
  city?: string | null,
  street?: string | null,
};

export type DeleteAddressInput = {
  id: string,
};

export type CreateEventInput = {
  id?: string | null,
  date: string,
  image?: string | null,
  type?: string | null,
  schedule?: string | null,
  eventAddressId?: string | null,
};

export type ModelEventConditionInput = {
  date?: ModelStringInput | null,
  image?: ModelStringInput | null,
  type?: ModelStringInput | null,
  schedule?: ModelStringInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
  eventAddressId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateEventInput = {
  id: string,
  date?: string | null,
  image?: string | null,
  type?: string | null,
  schedule?: string | null,
  eventAddressId?: string | null,
};

export type DeleteEventInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  mail: string,
  lastname?: string | null,
  firstname: string,
  image?: string | null,
  job?: string | null,
  birthdayUsersId?: string | null,
  newArrivalsUsersId?: string | null,
};

export type ModelUserConditionInput = {
  mail?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  image?: ModelStringInput | null,
  job?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  birthdayUsersId?: ModelIDInput | null,
  newArrivalsUsersId?: ModelIDInput | null,
};

export type UpdateUserInput = {
  id: string,
  mail?: string | null,
  lastname?: string | null,
  firstname?: string | null,
  image?: string | null,
  job?: string | null,
  birthdayUsersId?: string | null,
  newArrivalsUsersId?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateNewArrivalsInput = {
  id?: string | null,
  date: string,
};

export type ModelNewArrivalsConditionInput = {
  date?: ModelStringInput | null,
  and?: Array< ModelNewArrivalsConditionInput | null > | null,
  or?: Array< ModelNewArrivalsConditionInput | null > | null,
  not?: ModelNewArrivalsConditionInput | null,
};

export type NewArrivals = {
  __typename: "NewArrivals",
  id: string,
  date: string,
  users?: ModelUserConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNewArrivalsInput = {
  id: string,
  date?: string | null,
};

export type DeleteNewArrivalsInput = {
  id: string,
};

export type CreateUsersEventsInput = {
  id?: string | null,
  eventID: string,
  userID: string,
};

export type ModelUsersEventsConditionInput = {
  eventID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUsersEventsConditionInput | null > | null,
  or?: Array< ModelUsersEventsConditionInput | null > | null,
  not?: ModelUsersEventsConditionInput | null,
};

export type UpdateUsersEventsInput = {
  id: string,
  eventID?: string | null,
  userID?: string | null,
};

export type DeleteUsersEventsInput = {
  id: string,
};

export type ModelBirthdayFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelBirthdayFilterInput | null > | null,
  or?: Array< ModelBirthdayFilterInput | null > | null,
  not?: ModelBirthdayFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelBirthdayConnection = {
  __typename: "ModelBirthdayConnection",
  items:  Array<Birthday | null >,
  nextToken?: string | null,
};

export type ModelAddressFilterInput = {
  id?: ModelIDInput | null,
  city?: ModelStringInput | null,
  street?: ModelStringInput | null,
  and?: Array< ModelAddressFilterInput | null > | null,
  or?: Array< ModelAddressFilterInput | null > | null,
  not?: ModelAddressFilterInput | null,
};

export type ModelAddressConnection = {
  __typename: "ModelAddressConnection",
  items:  Array<Address | null >,
  nextToken?: string | null,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  image?: ModelStringInput | null,
  type?: ModelStringInput | null,
  schedule?: ModelStringInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
  eventAddressId?: ModelIDInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  mail?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  image?: ModelStringInput | null,
  job?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  birthdayUsersId?: ModelIDInput | null,
  newArrivalsUsersId?: ModelIDInput | null,
};

export type ModelNewArrivalsFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelNewArrivalsFilterInput | null > | null,
  or?: Array< ModelNewArrivalsFilterInput | null > | null,
  not?: ModelNewArrivalsFilterInput | null,
};

export type ModelNewArrivalsConnection = {
  __typename: "ModelNewArrivalsConnection",
  items:  Array<NewArrivals | null >,
  nextToken?: string | null,
};

export type ModelUsersEventsFilterInput = {
  id?: ModelIDInput | null,
  eventID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUsersEventsFilterInput | null > | null,
  or?: Array< ModelUsersEventsFilterInput | null > | null,
  not?: ModelUsersEventsFilterInput | null,
};

export type CreateBirthdayMutationVariables = {
  input: CreateBirthdayInput,
  condition?: ModelBirthdayConditionInput | null,
};

export type CreateBirthdayMutation = {
  createBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBirthdayMutationVariables = {
  input: UpdateBirthdayInput,
  condition?: ModelBirthdayConditionInput | null,
};

export type UpdateBirthdayMutation = {
  updateBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBirthdayMutationVariables = {
  input: DeleteBirthdayInput,
  condition?: ModelBirthdayConditionInput | null,
};

export type DeleteBirthdayMutation = {
  deleteBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAddressMutationVariables = {
  input: CreateAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type CreateAddressMutation = {
  createAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAddressMutationVariables = {
  input: UpdateAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type UpdateAddressMutation = {
  updateAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAddressMutationVariables = {
  input: DeleteAddressInput,
  condition?: ModelAddressConditionInput | null,
};

export type DeleteAddressMutation = {
  deleteAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type CreateNewArrivalsMutationVariables = {
  input: CreateNewArrivalsInput,
  condition?: ModelNewArrivalsConditionInput | null,
};

export type CreateNewArrivalsMutation = {
  createNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNewArrivalsMutationVariables = {
  input: UpdateNewArrivalsInput,
  condition?: ModelNewArrivalsConditionInput | null,
};

export type UpdateNewArrivalsMutation = {
  updateNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNewArrivalsMutationVariables = {
  input: DeleteNewArrivalsInput,
  condition?: ModelNewArrivalsConditionInput | null,
};

export type DeleteNewArrivalsMutation = {
  deleteNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUsersEventsMutationVariables = {
  input: CreateUsersEventsInput,
  condition?: ModelUsersEventsConditionInput | null,
};

export type CreateUsersEventsMutation = {
  createUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUsersEventsMutationVariables = {
  input: UpdateUsersEventsInput,
  condition?: ModelUsersEventsConditionInput | null,
};

export type UpdateUsersEventsMutation = {
  updateUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUsersEventsMutationVariables = {
  input: DeleteUsersEventsInput,
  condition?: ModelUsersEventsConditionInput | null,
};

export type DeleteUsersEventsMutation = {
  deleteUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetBirthdayQueryVariables = {
  id: string,
};

export type GetBirthdayQuery = {
  getBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBirthdaysQueryVariables = {
  id?: string | null,
  filter?: ModelBirthdayFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBirthdaysQuery = {
  listBirthdays?:  {
    __typename: "ModelBirthdayConnection",
    items:  Array< {
      __typename: "Birthday",
      id: string,
      date: string,
      users?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAddressQueryVariables = {
  id: string,
};

export type GetAddressQuery = {
  getAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAddressesQueryVariables = {
  filter?: ModelAddressFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAddressesQuery = {
  listAddresses?:  {
    __typename: "ModelAddressConnection",
    items:  Array< {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type ListEventsQueryVariables = {
  id?: string | null,
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

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
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNewArrivalsQueryVariables = {
  id: string,
};

export type GetNewArrivalsQuery = {
  getNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNewArrivalsQueryVariables = {
  id?: string | null,
  filter?: ModelNewArrivalsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListNewArrivalsQuery = {
  listNewArrivals?:  {
    __typename: "ModelNewArrivalsConnection",
    items:  Array< {
      __typename: "NewArrivals",
      id: string,
      date: string,
      users?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUsersEventsQueryVariables = {
  id: string,
};

export type GetUsersEventsQuery = {
  getUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersEventsQueryVariables = {
  filter?: ModelUsersEventsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersEventsQuery = {
  listUsersEvents?:  {
    __typename: "ModelUsersEventsConnection",
    items:  Array< {
      __typename: "UsersEvents",
      id: string,
      eventID: string,
      userID: string,
      event:  {
        __typename: "Event",
        id: string,
        date: string,
        image?: string | null,
        type?: string | null,
        schedule?: string | null,
        createdAt: string,
        updatedAt: string,
        eventAddressId?: string | null,
      },
      user:  {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBirthdaySubscription = {
  onCreateBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBirthdaySubscription = {
  onUpdateBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBirthdaySubscription = {
  onDeleteBirthday?:  {
    __typename: "Birthday",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAddressSubscription = {
  onCreateAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAddressSubscription = {
  onUpdateAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAddressSubscription = {
  onDeleteAddress?:  {
    __typename: "Address",
    id: string,
    city?: string | null,
    street?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    date: string,
    image?: string | null,
    participants?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type?: string | null,
    address?:  {
      __typename: "Address",
      id: string,
      city?: string | null,
      street?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    schedule?: string | null,
    createdAt: string,
    updatedAt: string,
    eventAddressId?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    job?: string | null,
    events?:  {
      __typename: "ModelUsersEventsConnection",
      items:  Array< {
        __typename: "UsersEvents",
        id: string,
        eventID: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
    newArrivalsUsersId?: string | null,
  } | null,
};

export type OnCreateNewArrivalsSubscription = {
  onCreateNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNewArrivalsSubscription = {
  onUpdateNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNewArrivalsSubscription = {
  onDeleteNewArrivals?:  {
    __typename: "NewArrivals",
    id: string,
    date: string,
    users?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        mail: string,
        lastname?: string | null,
        firstname: string,
        image?: string | null,
        job?: string | null,
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
        newArrivalsUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUsersEventsSubscription = {
  onCreateUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUsersEventsSubscription = {
  onUpdateUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUsersEventsSubscription = {
  onDeleteUsersEvents?:  {
    __typename: "UsersEvents",
    id: string,
    eventID: string,
    userID: string,
    event:  {
      __typename: "Event",
      id: string,
      date: string,
      image?: string | null,
      participants?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      type?: string | null,
      address?:  {
        __typename: "Address",
        id: string,
        city?: string | null,
        street?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      schedule?: string | null,
      createdAt: string,
      updatedAt: string,
      eventAddressId?: string | null,
    },
    user:  {
      __typename: "User",
      id: string,
      mail: string,
      lastname?: string | null,
      firstname: string,
      image?: string | null,
      job?: string | null,
      events?:  {
        __typename: "ModelUsersEventsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
      newArrivalsUsersId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
