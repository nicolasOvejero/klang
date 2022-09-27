/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  mail: string,
  lastname?: string | null,
  firstname: string,
  image?: string | null,
  birthdayUsersId?: string | null,
};

export type ModelUserConditionInput = {
  mail?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  birthdayUsersId?: ModelIDInput | null,
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

export type User = {
  __typename: "User",
  id: string,
  mail: string,
  lastname?: string | null,
  firstname: string,
  image?: string | null,
  createdAt: string,
  updatedAt: string,
  birthdayUsersId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  mail?: string | null,
  lastname?: string | null,
  firstname?: string | null,
  image?: string | null,
  birthdayUsersId?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

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

export type UpdateBirthdayInput = {
  id: string,
  date?: string | null,
};

export type DeleteBirthdayInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  mail?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  birthdayUsersId?: ModelIDInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelBirthdayFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelBirthdayFilterInput | null > | null,
  or?: Array< ModelBirthdayFilterInput | null > | null,
  not?: ModelBirthdayFilterInput | null,
};

export type ModelBirthdayConnection = {
  __typename: "ModelBirthdayConnection",
  items:  Array<Birthday | null >,
  nextToken?: string | null,
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
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
  } | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
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
      createdAt: string,
      updatedAt: string,
      birthdayUsersId?: string | null,
    } | null >,
    nextToken?: string | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
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

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    mail: string,
    lastname?: string | null,
    firstname: string,
    image?: string | null,
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    birthdayUsersId?: string | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
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
        createdAt: string,
        updatedAt: string,
        birthdayUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
