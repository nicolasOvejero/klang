import { waitFor } from "@testing-library/react";
import { API } from "aws-amplify";
import moment from "moment";
import { listNewArrivals } from "../../components/custom-queries";
import { createAddress, createNewArrivals } from "../../graphql/mutations";
import RequestError from "../errors/request-error";
import NewArrivalsService from "./new-arrivals.service";

test('getNewArrivals return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listNewArrivals: {
                        items: [{
                            id: 'id-1',
                            date: '2022-10-10',
                            users: {
                                items: [{
                                    id: 'u-1',
                                    lastname: 'test',
                                    firstname: 'TEST',
                                    image: 'image.com',
                                    job: 'Job'
                                }]
                            }
                        }, {
                            id: 'id-2',
                            date: '2022-10-12',
                            users: {
                                items: [{
                                    props: 'prop',
                                }]
                            }
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return NewArrivalsService.getNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listNewArrivals,
        variables: {
            input: {
                variable: 'v1'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([
        {
            id: 'id-1',
            date: moment('2022-10-10').toDate(),
            users: [{ 
                id: 'u-1',
                lastname: 'test',
                firstname: 'TEST',
                image: 'image.com',
                job: 'Job'
            }]
        },
        {
            id: 'id-2',
            date: moment('2022-10-12').toDate(),
            users: [{ 
                id: '',
                lastname: '',
                firstname: '',
                image: '',
                job: ''
            }]
        }
    ]);
});

test('getNewArrivals return formatted items => no users', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listNewArrivals: {
                        items: [{
                            id: 'id-1',
                            date: '2022-10-10',
                            users: null
                        }, {
                            id: 'id-2',
                            date: '2022-10-12',
                            users: {}
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return NewArrivalsService.getNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listNewArrivals,
        variables: {
            input: {
                variable: 'v1'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([
        {
            id: 'id-1',
            date: moment('2022-10-10').toDate(),
            users: []
        },
        {
            id: 'id-2',
            date: moment('2022-10-12').toDate(),
            users: []
        }
    ]);
});

test('getNewArrivals return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listNewArrivals: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return NewArrivalsService.getNewArrivals({
            input: {
                variable: 'v1'
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
        return NewArrivalsService.getNewArrivals({
            input: {
                variable: 'v1'
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
        return NewArrivalsService.getNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoDate).toEqual([]);
});

test('getNewArrivals throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => NewArrivalsService.getNewArrivals(
        {
            input: {
                variable: 'v1'
            }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('createAddress return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createAddress: {
                        id: 'id-1',
                        city: 'city',
                        street: '1 street ouest'
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return NewArrivalsService.createAddress({
            input: {
                city: 'city',
                street: '1 street ouest'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: createAddress,
        variables: {
            input: {
                city: 'city',
                street: '1 street ouest'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'id-1',
        city: 'city',
        street: '1 street ouest'
    });
});

test('createAddress throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => NewArrivalsService.createAddress({
        input: {
            city: 'city',
            street: '1 street ouest'
        }
    })).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('createAddress return empty undefined => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoList = await waitFor(() => {
        return NewArrivalsService.createAddress({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoList).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return NewArrivalsService.createAddress({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoDate).toEqual(undefined);
});

test('createNewArrivals return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createNewArrivals: {
                        id: 'id-1',
                        date: '2022-10-14',
                        users: {
                            items: [{
                                id: 'u-1',
                                lastname: 'lastname',
                                firstname: 'firstname',
                                image: 'image',
                                job: 'job',
                            }]
                        }
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return NewArrivalsService.createNewArrivals({
            input: {
                date: '2022-10-14'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: createNewArrivals,
        variables: {
            input: {
                date: '2022-10-14'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'id-1',
        date: moment('2022-10-14').toDate(),
        users: [{
            id: 'u-1',
            lastname: 'lastname',
            firstname: 'firstname',
            image: 'image',
            job: 'job',
        }]
    });
});

test('createNewArrivals throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => NewArrivalsService.createNewArrivals({
        input: {
            city: 'city',
            street: '1 street ouest'
        }
    })).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('createNewArrivals return empty undefined => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoList = await waitFor(() => {
        return NewArrivalsService.createNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoList).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return NewArrivalsService.createNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoDate).toEqual(undefined);
});

test('createNewArrivals return formatted items => no users', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createNewArrivals: {
                        id: 'id-1',
                        date: '2022-10-14',
                        users: {}
                    }
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return NewArrivalsService.createNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoItems).toEqual({
        id: 'id-1',
        date: moment('2022-10-14').toDate(),
        users: []
    });

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createNewArrivals: {
                        id: 'id-1',
                        date: '2022-10-14'
                    }
                }
            };
        }
    );

    const valueNoUsers = await waitFor(() => {
        return NewArrivalsService.createNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoUsers).toEqual({
        id: 'id-1',
        date: moment('2022-10-14').toDate(),
        users: []
    });
});

test('createNewArrivals return formatted items => users empty', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createNewArrivals: {
                        id: 'id-1',
                        date: '2022-10-14',
                        users: {
                            items: [{
                                test: 'test'
                            }]
                        }
                    }
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return NewArrivalsService.createNewArrivals({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoItems).toEqual({
        id: 'id-1',
        date: moment('2022-10-14').toDate(),
        users: [{
            id: '',
            lastname: '',
            firstname: '',
            image: '',
            job: '',
        }]
    });
});
