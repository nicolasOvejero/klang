import { waitFor } from "@testing-library/react";
import { API } from "aws-amplify";
import moment from "moment";
import { listBithday, listBithdayLight } from "../../components/custom-queries";
import { createBirthday } from "../../graphql/mutations";
import RequestError from "../errors/request-error";
import BirthdayService from "./birthday.service";

xtest('getBirthdays return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listBirthdays: {
                        items: [{
                            id: 'id-1',
                            date: '2022-10-10',
                            users: {
                                items: [{
                                    id: 'u-1',
                                    lastname: 'test',
                                    firstname: 'TEST',
                                    image: 'image.com',
                                    mail: 'mail'
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
        return BirthdayService.getBirthdays({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listBithday,
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
                mail: 'mail'
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
                mail: ''
            }]
        }
    ]);
});

test('getBirthdays return formatted items => no users', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listBirthdays: {
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
        return BirthdayService.getBirthdays({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listBithday,
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

test('getBirthdays return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listBirthdays: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return BirthdayService.getBirthdays({
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
        return BirthdayService.getBirthdays({
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
        return BirthdayService.getBirthdays({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoDate).toEqual([]);
});

test('getBirthdays throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => BirthdayService.getBirthdays(
        {
            input: {
                variable: 'v1'
            }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('getBirthdaysLight return API items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listBirthdays: {
                        items: [{
                            id: 'id-1',
                            date: '2022-10-10'
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return BirthdayService.getBirthdaysLight({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listBithdayLight,
        variables: {
            input: {
                variable: 'v1'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([{
        id: 'id-1',
        date: '2022-10-10'
    }]);
});

test('getBirthdaysLight return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listBirthdays: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return BirthdayService.getBirthdaysLight({
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
        return BirthdayService.getBirthdaysLight({
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
        return BirthdayService.getBirthdaysLight({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoDate).toEqual([]);
});

test('getBirthdaysLight throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => BirthdayService.getBirthdaysLight(
        {
            input: {
                variable: 'v1'
            }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('createBirthday return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createBirthday: {
                        id: 'id-1',
                        date: '2022-01-01',
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return BirthdayService.createBirthday({
            input: {
                date: '2022-01-01'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: createBirthday,
        variables: {
            input: {
                date: '2022-01-01'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'id-1',
        date: moment('2022-01-01').toDate(),
    });
});

test('createBirthday return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {}
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return BirthdayService.createBirthday({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoItems).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return BirthdayService.createBirthday({
            input: {
                variable: 'v1'
            }
        });
    });

    expect(valueNoDate).toEqual(undefined);
});

test('createBirthday throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => BirthdayService.createBirthday(
        {
            input: {
                variable: 'v1'
            }
        }
    )).rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('assertBirthdayId return found id', async () => {
    BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
        (value: object) => {
            return [{
                id: 'id-1',
            }];
        }
    );

    const value = await waitFor(() => {
        return BirthdayService.assertBirthdayId('2023-01-01');
    });

    expect(BirthdayService.getBirthdaysLight).toHaveBeenCalledTimes(1);
    expect(BirthdayService.getBirthdaysLight).toHaveBeenCalledWith({
        filter: {
            date: {
                eq: '2023-01-01'
            }
        }
    });

    expect(value).toEqual('id-1');
});

test('assertBirthdayId return new id', async () => {
    BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
        (value: object) => {
            return [];
        }
    );
    BirthdayService.createBirthday = jest.fn().mockImplementation(
        (value: object) => {
            return {
                id: 'id-1',
            };
        }
    );

    const value = await waitFor(async () => {
        return BirthdayService.assertBirthdayId('2022-11-01');
    });

    expect(BirthdayService.createBirthday).toBeCalledTimes(1);
    expect(BirthdayService.createBirthday).toBeCalledWith({
        input: {
            date: '2022-11-01'
        }
    });

    expect(BirthdayService.getBirthdaysLight).toHaveBeenCalledTimes(1);
    expect(BirthdayService.getBirthdaysLight).toHaveBeenCalledWith({
        filter: {
            date: {
                eq: '2022-11-01'
            }
        }
    });

    expect(value).toEqual('id-1');
});

test('assertBirthdayId : getBirthdaysLight throw error => API give error', async () => {
    BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
        (value: object) => {
            throw new RequestError('Oups', []);
        }
    );

    await expect(async () => BirthdayService.assertBirthdayId('2022-11-01'))
        .rejects
        .toThrow(RequestError);

    expect(BirthdayService.getBirthdaysLight).toHaveBeenCalledTimes(1);
});

test('assertBirthdayId : getBirthdaysLight throw error => API give error', async () => {
    BirthdayService.getBirthdaysLight = jest.fn().mockImplementation(
        (value: object) => {
            return [];
        }
    );
    BirthdayService.createBirthday = jest.fn().mockImplementation(
        (value: object) => {
            return undefined;
        }
    );

    await expect(async () => BirthdayService.assertBirthdayId('2022-11-01'))
        .rejects
        .toThrow(Error);

    expect(BirthdayService.getBirthdaysLight).toHaveBeenCalledTimes(1);
    expect(BirthdayService.createBirthday).toHaveBeenCalledTimes(1);
});
