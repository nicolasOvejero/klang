import { waitFor } from "@testing-library/react";
import { API } from "aws-amplify";
import moment from "moment";
import { getNextEvents, listEvents, listEventsLight, subscriptionToEvent } from "../../components/custom-queries";
import { createEvent, deleteEvent, updateEvent } from "../../graphql/mutations";
import RequestError from "../errors/request-error";
import EventService from "./event.service";

test('getNextEvent return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {
                        items: [{
                            id: 'e-1',
                            date: '2022-12-31',
                            image: 'https://google.com',
                            type: 'New year',
                            address: {
                                city: 'Montreal',
                                street: 'Everywehere',
                            },
                            schedule: '00h - 03h00',
                            published: false,
                            createBy: {
                                id: 'u-1',
                                lastname: 'lastname',
                                firstname: 'firstname',
                                image: 'image'
                            },
                            participants: {
                                items: [{
                                    user: {
                                        id: 'u-1',
                                        lastname: 'lastname',
                                        firstname: 'firstname',
                                        image: 'image'
                                    }
                                }, {
                                    user: {
                                        other: ''
                                    }
                                }]
                            }
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.getNextEvent({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: getNextEvents,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([{
        id: 'e-1',
        date: moment('2022-12-31').toDate(),
        image: 'https://google.com',
        type: 'New year',
        address: {
            city: 'Montreal',
            street: 'Everywehere',
        },
        schedule: '00h - 03h00',
        published: false,
        createBy: {
            id: 'u-1',
            lastname: 'lastname',
            firstname: 'firstname',
            image: 'image'
        },
        participants: [
            {
                id: 'u-1',
                lastname: 'lastname',
                firstname: 'firstname',
                image: 'image'
            },
            {
                id: '',
                lastname: '',
                firstname: '',
                image: ''
            },
        ]
    }]);
});

test('getNextEvent return formatted items with min info', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {
                        items: [{
                            address: {
                            },
                            createBy: {
                            },
                            participants: {
                                items: []
                            }
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.getNextEvent({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: getNextEvents,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([{
        id: '',
        date: moment().toDate(),
        image: '',
        type: '',
        address: {
            city: '',
            street: '',
        },
        schedule: '',
        published: true,
        createBy: {
            id: '',
            lastname: '',
            firstname: '',
            image: ''
        },
        participants: []
    }]);
});

test('getNextEvent return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return EventService.getNextEvent({});
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
        return EventService.getNextEvent({});
    });

    expect(valueNoList).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return EventService.getNextEvent({});
    });

    expect(valueNoDate).toEqual([]);
});

test('getNextEvent throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.getNextEvent({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('getEvents return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {
                        items: [{
                            id: 'e-1',
                            date: '2022-12-31',
                            image: 'https://google.com',
                            type: 'New year',
                            address: {
                                city: 'Montreal',
                                street: 'Everywehere',
                            },
                            schedule: '00h - 03h00',
                            published: false,
                            createBy: {
                                id: 'u-1',
                                lastname: 'lastname',
                                firstname: 'firstname',
                                image: 'image'
                            },
                            participants: {
                                items: [{
                                    user: {
                                        id: 'u-1',
                                        lastname: 'lastname',
                                        firstname: 'firstname',
                                        image: 'image'
                                    }
                                },{
                                    user: {
                                        other: ''
                                    }
                                }]
                            }
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.getEvents({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listEvents,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([{
        id: 'e-1',
        date: moment('2022-12-31').toDate(),
        image: 'https://google.com',
        type: 'New year',
        address: {
            city: 'Montreal',
            street: 'Everywehere',
        },
        schedule: '00h - 03h00',
        published: false,
        createBy: {
            id: 'u-1',
            lastname: 'lastname',
            firstname: 'firstname',
            image: 'image'
        },
        participants: [
            {
                id: 'u-1',
                lastname: 'lastname',
                firstname: 'firstname',
                image: 'image'
            },
            {
                id: '',
                lastname: '',
                firstname: '',
                image: ''
            }
        ]
    }]);
});

test('getEvents return formatted items with min info', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {
                        items: [{
                            address: {
                            },
                            createBy: {
                            },
                            participants: {
                                items: []
                            }
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.getEvents({});
    });
    const currentDate = moment().toDate();

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listEvents,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([{
        id: '',
        date: currentDate,
        image: '',
        type: '',
        address: {
            city: '',
            street: '',
        },
        schedule: '',
        published: true,
        createBy: {
            id: '',
            lastname: '',
            firstname: '',
            image: ''
        },
        participants: []
    }]);
});

test('getEvents return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return EventService.getEvents({});
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
        return EventService.getEvents({});
    });

    expect(valueNoList).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return EventService.getEvents({});
    });

    expect(valueNoDate).toEqual([]);
});

test('getEvents throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.getEvents({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('getEventsLight return API items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listEvents: {
                        items: [{
                            id: 'e-1',
                            date: '2022-12-31',
                            type: 'New year',
                            participants: {
                                items: [{
                                    id: 'id-1',
                                    user: {
                                        id: 'u-1',
                                        lastname: 'lastname',
                                        firstname: 'firstname',
                                        image: 'image'
                                    }
                                }]
                            }
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.getEventsLight({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: listEventsLight,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        listEvents: {
            items: [{
                id: 'e-1',
                date: '2022-12-31',
                type: 'New year',
                participants: {
                    items: [{
                        id: 'id-1',
                        user: {
                            id: 'u-1',
                            lastname: 'lastname',
                            firstname: 'firstname',
                            image: 'image'
                        }
                    }]
                }
            }]
        }
    });
});

test('getEventsLight return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return EventService.getEventsLight({});
    });

    expect(valueNoDate).toEqual(undefined);
});

test('getEventsLight throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.getEventsLight({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('createEvent return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    createEvent: {
                        id: 'e-1',
                        date: '2022-12-31',
                        image: 'https://google.com',
                        type: 'New year',
                        address: {
                            city: 'Montreal',
                            street: 'Everywehere',
                        },
                        schedule: '00h - 03h00',
                        published: false,
                        createBy: {
                            id: 'u-1',
                            lastname: 'lastname',
                            firstname: 'firstname',
                            image: 'image'
                        },
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.createEvent({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: createEvent,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'e-1',
        date: moment('2022-12-31').toDate(),
        image: 'https://google.com',
        type: 'New year',
        address: {
            city: 'Montreal',
            street: 'Everywehere',
        },
        schedule: '00h - 03h00',
        published: false,
        createBy: {
            id: 'u-1',
            lastname: 'lastname',
            firstname: 'firstname',
            image: 'image'
        }
    });
});

test('createEvent return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return EventService.createEvent({});
    });

    expect(valueNoItems).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return EventService.createEvent({});
    });

    expect(valueNoDate).toEqual(undefined);
});

test('createEvent throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.createEvent({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('updateEvent return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    updateEvent: {
                        id: 'e-1',
                        date: '2022-12-31',
                        image: 'https://google.com',
                        type: 'New year',
                        address: {
                            city: 'Montreal',
                            street: 'Everywehere',
                        },
                        schedule: '00h - 03h00',
                        published: false,
                        createBy: {
                            id: 'u-1',
                            lastname: 'lastname',
                            firstname: 'firstname',
                            image: 'image'
                        },
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.updateEvent({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: updateEvent,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual({
        id: 'e-1',
        date: moment('2022-12-31').toDate(),
        image: 'https://google.com',
        type: 'New year',
        address: {
            city: 'Montreal',
            street: 'Everywehere',
        },
        schedule: '00h - 03h00',
        published: false,
        createBy: {
            id: 'u-1',
            lastname: 'lastname',
            firstname: 'firstname',
            image: 'image'
        }
    });
});

test('updateEvent return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return EventService.updateEvent({});
    });

    expect(valueNoItems).toEqual(undefined);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoDate = await waitFor(() => {
        return EventService.updateEvent({});
    });

    expect(valueNoDate).toEqual(undefined);
});

test('updateEvent throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.updateEvent({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('deleteEvent call API', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    await waitFor(() => {
        return EventService.deleteEvent({
            input: {
                id: 'idEvent'
            }
        });
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: deleteEvent,
        variables: {
            input: {
                id: 'idEvent'
            }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
});

test('deleteEvent throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.deleteEvent({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});

test('findSubscriptionByUserIdAndEventId return formatted items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listUsersEvents: {
                        items: [{
                            id: 'u-1',
                            other: ''
                        }, {
                            id: 'u-2',
                            other: ''
                        }]
                    }
                }
            };
        }
    );

    const value = await waitFor(() => {
        return EventService.findSubscriptionByUserIdAndEventId({});
    });

    expect(API.graphql).toHaveBeenCalledTimes(1);
    expect(API.graphql).toHaveBeenCalledWith({
        query: subscriptionToEvent,
        variables: {},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    expect(value).toEqual([
        'u-1',
        'u-2',
    ]);
});

test('findSubscriptionByUserIdAndEventId return empty array => no items', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                    listUsersEvents: {}
                }
            };
        }
    );

    const valueNoItems = await waitFor(() => {
        return EventService.findSubscriptionByUserIdAndEventId({});
    });

    expect(valueNoItems).toEqual([]);

    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                data: {
                }
            };
        }
    );

    const valueNoData = await waitFor(() => {
        return EventService.findSubscriptionByUserIdAndEventId({});
    });

    expect(valueNoData).toEqual([]);


    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {};
        }
    );

    const valueNoValue = await waitFor(() => {
        return EventService.findSubscriptionByUserIdAndEventId({});
    });

    expect(valueNoValue).toEqual([]);
});

test('findSubscriptionByUserIdAndEventId throw error => API give error', async () => {
    API.graphql = jest.fn().mockImplementation(
        (value: object) => {
            return {
                errors: [{ message: 'Again an error' }]
            };
        }
    );

    await expect(async () => EventService.findSubscriptionByUserIdAndEventId({}))
        .rejects
        .toThrow(RequestError);

    expect(API.graphql).toHaveBeenCalledTimes(1);
});
