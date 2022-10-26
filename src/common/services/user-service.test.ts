import { waitFor } from "@testing-library/react";
import { API } from "aws-amplify";
import { listUsers, listUsersLight } from "../../components/custom-queries";
import { createUser, createUsersEvents, updateUser } from "../../graphql/mutations";
import RequestError from "../errors/request-error";
import UserService from "./user.service";

test('getUsers return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listUsers: {
                        items: [{
                                id: 'u-1',
                                lastname: 'test',
                                firstname: 'TEST',
                                image: 'image.com',
                                job: 'Job',
                                mail: 'Mail'
                            },
                            {
                                id: 'u-2',
                                firstname: 'TEST2',
                                mail: 'Mail2'
                            }
                        ]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return UserService.getUsers({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listUsers,
        variables: {
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([
        {
            id: 'u-1',
            firstname: 'TEST',
            mail: 'Mail',
            lastname: 'test',
            image: 'image.com',
            job: 'Job',
        },
        {
            id: 'u-2',
            firstname: 'TEST2',
            mail: 'Mail2',
            lastname: '',
            image: '',
            job: '',
        }
    ]);
});

test('getUsers return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listUsers: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return UserService.getUsers({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(valueNoItems).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoList = await waitFor(() => {
        return UserService.getUsers({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(valueNoList).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return UserService.getUsers({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(valueNoDate).toEqual([]);
});

test('getUsers throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => UserService.getUsers(
        {
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('getUserLight return API items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listUsers: {
                        items: [{
                                id: 'u-1',
                                lastname: 'test',
                                firstname: 'TEST',
                            },
                            {
                                id: 'u-2',
                                firstname: 'TEST2',
                            }
                        ]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return UserService.getUserLight({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listUsersLight,
        variables: {
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([
    {
            id: 'u-1',
            lastname: 'test',
            firstname: 'TEST',
        },
        {
            id: 'u-2',
            firstname: 'TEST2',
        }
    ]);
});

test('getUserLight return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listUsers: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return UserService.getUserLight({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(valueNoItems).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoList = await waitFor(() => {
        return UserService.getUserLight({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(valueNoList).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return UserService.getUserLight({
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        });
    });

    expect(valueNoDate).toEqual([]);
});

test('getUserLight throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => UserService.getUserLight(
        {
            filter: {
                mail: {
                    eq: 'test@test.com'
                }
            }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('creatUser return API items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createUser: {
                        id: 'u-1',
                        mail: 'test@test.com',
                        firstname: 'TEST',
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return UserService.creatUser({
            input: {
                id: 'u-1',
                mail: 'test@test.com',
                firstname: 'TEST',
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: createUser,
        variables: {
            input: {
                id: 'u-1',
                mail: 'test@test.com',
                firstname: 'TEST',
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'u-1',
        mail: 'test@test.com',
        firstname: 'TEST',
        lastname: '',
        image: '',
        job: ''
    });
});

test('creatUser return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return UserService.creatUser({
            filter: { input: {} }
        });
    });

    expect(valueNoItems).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return UserService.creatUser({
            filter: { input: {} }
        });
    });

    expect(valueNoDate).toEqual(undefined);
});

test('creatUser throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => UserService.creatUser(
        {
            filter: { input: {} }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('udpateUser return API items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    updateUser: {
                        id: 'u-1',
                        mail: 'test@test.com',
                        firstname: 'TEST'
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return UserService.udpateUser({
            input: {
                id: 'u-1',
                mail: 'test@test.com',
                firstname: 'TEST',
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: updateUser,
        variables: {
            input: {
                id: 'u-1',
                mail: 'test@test.com',
                firstname: 'TEST',
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'u-1',
        mail: 'test@test.com',
        firstname: 'TEST',
        lastname: '',
        image: '',
        job: '',
    });
});

test('udpateUser return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return UserService.udpateUser({
            filter: { input: {} }
        });
    });

    expect(valueNoItems).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return UserService.udpateUser({
            filter: { input: {} }
        });
    });

    expect(valueNoDate).toEqual(undefined);
});

test('udpateUser throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => UserService.udpateUser(
        {
            filter: { input: {} }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('createUsersEvents return API items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createUsersEvents: {
                        user: {
                            id: 'u-1',
                            mail: 'test@test.com',
                            firstname: 'TEST'
                        }
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return UserService.createUsersEvents({
            input: {
                eventID: 'eventId',
                userID: 'userId'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: createUsersEvents,
        variables: {
            input: {
                eventID: 'eventId',
                userID: 'userId'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        user: {
            id: 'u-1',
            firstname: 'TEST',
            lastname: '',
            image: '',
            job: '',
        }
    });
});

test('createUsersEvents return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return UserService.createUsersEvents({
            filter: { input: {} }
        });
    });

    expect(valueNoItems).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return UserService.createUsersEvents({
            filter: { input: {} }
        });
    });

    expect(valueNoDate).toEqual(undefined);
});

test('createUsersEvents throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => UserService.createUsersEvents(
        {
            filter: { input: {} }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('bulkDeleteUsers call API with good parameters', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    await waitFor(() => {
        return UserService.bulkDeleteUsers(
            'mutation1: deleteUsersEvents(input: {id: "1"}) { 1 }'
        );
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        authToken: undefined,
        query: 'mutation batchMutation {mutation1: deleteUsersEvents(input: {id: "1"}) { 1 }}',
        userAgentSuffix: undefined,
        variables: {},
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('bulkDeleteUsers throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => UserService.bulkDeleteUsers(
        'mutation1: deleteUsersEvents(input: {id: "1"}) { 1 }'
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});
