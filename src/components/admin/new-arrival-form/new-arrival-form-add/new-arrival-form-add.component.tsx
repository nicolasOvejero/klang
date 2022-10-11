import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listUsersLight, ListUsersLightQuery } from '../../../custom-queries';
import { API } from 'aws-amplify';
import Dropdown, { DropdownOption } from '../../../dropdown/dropdown.component';
import InputDate from '../../../input-date/input-date.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import './new-arrival-form-add.style.scss';
import { listNewArrivals } from '../../../../graphql/queries';
import { CreateNewArrivalsMutation, ListNewArrivalsQuery, UpdateUserMutation } from '../../../../API';
import { createNewArrivals, updateUser } from '../../../../graphql/mutations';

const defaultNewArrivalsAddState = {
    user: '',
    day: '',
    month: '',
    year: '',
    formError: '',
    success: false
};

function NewArrivalFormAdd() {
    moment.locale('fr');
    const [users, setUsers] = useState<DropdownOption[]>([]);
    const [newArrivals, setNewArrivals] = useState(defaultNewArrivalsAddState);
    const { user, day, month, year, formError, success } = newArrivals;

    const handleSelecteChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewArrivals({
            ...newArrivals,
            [name]: value,
            formError: ''
        });
    }

    const upsertNewArrival = async(date: string) => {
        const newArrivalsList = await API.graphql({
            query: listNewArrivals,
            variables: {
                filter: {
                    date: {
                        eq: date
                    }
                }
            }
        }) as GraphQLResult<ListNewArrivalsQuery>;

        if (newArrivalsList.errors) {
            console.error(newArrivalsList.errors);
            setNewArrivals({
                ...newArrivals,
                formError: 'Une erreur est survenue'
            });
            return;
        }

        const items = newArrivalsList.data?.listNewArrivals?.items;
        if (items && items.length > 0) {
            return items[0];
        }

        const newNewArrivals = await API.graphql({
            query: createNewArrivals,
            variables: {
                input: {
                    date: date
                }
            }
        }) as GraphQLResult<CreateNewArrivalsMutation>;

        if (newNewArrivals.errors) {
            console.error(newNewArrivals.errors);
            setNewArrivals({
                ...newArrivals,
                formError: 'Une erreur est survenue'
            });
            return;
        }

        return newNewArrivals.data?.createNewArrivals;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!year || !month || !day || !user) {
            return;
        }

        const givenDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
        const newArrivalValue = await upsertNewArrival(givenDate);

        if (newArrivalValue) {
            const updatedUser = await API.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user,
                        newArrivalsUsersId: newArrivalValue?.id
                    }
                }
            }) as GraphQLResult<UpdateUserMutation>;

            if (updatedUser.errors) {
                console.error(updatedUser.errors);
                setNewArrivals({
                    ...newArrivals,
                    formError: 'Une erreur est survenue'
                });
                return;
            }

            setNewArrivals({
                ...defaultNewArrivalsAddState,
                success: true
            });
            setTimeout(() => {
                setNewArrivals(defaultNewArrivalsAddState);
            }, 2000);
        }
    }
    
    const getNewUsers = async () => {
        const apiData = await API.graphql({
            query: listUsersLight,
            variables: {
                filter: {
                    newArrivalsUsersId: {
                        attributeExists: false
                    }
                }
            }
        }) as GraphQLResult<ListUsersLightQuery>;

        if (apiData.errors) {
            // TO DO
            return;
        }

        const items = apiData.data?.listUsers?.items;
        if (items) {
            setUsers([{
                    value: '',
                    label: ''
                }].concat(items.map((item) => {
                    return {
                        label: `${item.firstname} ${item.lastname}`,
                        value: item.id,
                    }
                }))
            );
        }
    }

    useEffect(() => {
        getNewUsers();
    }, []);

    return (
        <form
            className='form-newarrivals-add'
            onSubmit={handleSubmit}
        >
            <Dropdown
                label='Qui ?'
                value={user}
                name='user'
                required
                haserror={formError !== ''}
                errormessage={formError}
                onChange={handleSelecteChange}
                options={users}
            />
            <InputDate
                day={{ value: day, formHasError: formError !== '', onChange: handleSelecteChange }}
                month={{ value: month, formHasError: formError !== '', onChange: handleSelecteChange }}
                year={{ value: year, formHasError: formError !== '', onChange: handleSelecteChange }}
                startDateYear={moment().year()}
                endDateYear={moment().year() + 5}
            ></InputDate>
            <Button
                label='Enregistrer'
                type='submit'
            />
            <Toaster
                message="La date d'arrivée a bien été enregistrée"
                type='success'
                display={success}
            />
        </form>
    )
}

export default NewArrivalFormAdd;
