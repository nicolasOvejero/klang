import { API } from 'aws-amplify';
import { ListBirthdaysLightQuery, listBithdayLight, listUsersLight, ListUsersLightQuery } from '../../../custom-queries';
import { GraphQLResult } from "@aws-amplify/api";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Dropdown, { DropdownOption } from '../../../dropdown/dropdown.component';
import moment from 'moment';
import 'moment/locale/fr';
import Button from '../../../button/button.component';
import { createBirthday, updateUser } from '../../../../graphql/mutations';
import { CreateBirthdayMutation, UpdateUserMutation } from '../../../../API';
import './birthday-form-add.style.scss';
import Toaster from '../../../toaster/toaster.component';

const defaultBirthdayAddState = {
    user: '',
    day: '',
    month: '',
    year: '',
    formHasError: false,
    formError: '',
    success: false
};

function BirthdayFormAdd() {
    moment.locale('fr');
    const [users, setUsers] = useState<DropdownOption[]>([]);
    const [birthdayAddState, setBirthdayAddState] = useState(defaultBirthdayAddState);
    const { user, day, month, year, formHasError, formError, success } = birthdayAddState;

    const arrayDays: DropdownOption[] =  [{
        value: '',
        label: ''
    }];
    setArrayValue(1, 31, arrayDays);
    const arrayMonth: DropdownOption[] = [{
        value: '',
        label: ''
    }];
    moment.months().forEach((month, index) => {
        arrayMonth.push({
            value: (index + 1).toString(),
            label: month
        });
    });
    const arrayYear: DropdownOption[] = [{
        value: '',
        label: ''
    }];
    setArrayValue(1950, moment().year(), arrayYear);

    function setArrayValue(start: number, end: number, array: DropdownOption[]) {
        for (var i = start; i < end + 1; i++) {
            array.push({
                value: i.toString(),
                label: i.toString()
            });
        }
    }

    const handleSelecteChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setBirthdayAddState({
            ...birthdayAddState,
            [name]: value,
            formHasError: false,
            formError: ''
        });
    }

    const saveNewBirthdayToUser = async (birthdayId: string | undefined) => {
        if (!birthdayId) {
            setBirthdayAddState({
                ...birthdayAddState,
                formHasError: true,
                formError: 'Une erreur est survenue'
            });
            return;
        }
        await API.graphql({
            query: updateUser,
            variables: {
                input: {
                    id: user, 
                    birthdayUsersId: birthdayId
                }
            }
        }) as GraphQLResult<UpdateUserMutation>;
        setBirthdayAddState({
            ...defaultBirthdayAddState,
            success: true
        });
        setTimeout(() => {
            setBirthdayAddState(defaultBirthdayAddState);
        }, 2000);
    }

    const saveNewBirthday = async (date: string) => {
        const newBirthday = await API.graphql({
            query: createBirthday,
            variables: {
                input: {
                    date
                }
            }
        }) as GraphQLResult<CreateBirthdayMutation>;

        await saveNewBirthdayToUser(newBirthday.data?.createBirthday?.id);        
    }

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user || !day || !month || !year) {
            return;
        }
        const formatedDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
        const existingBirthdateData = await API.graphql({
            query: listBithdayLight,
            variables: {
                filter: {
                    date: {
                        eq: formatedDate
                    }
                }
            }
        }) as GraphQLResult<ListBirthdaysLightQuery>;
        const items = existingBirthdateData.data?.listBirthdays?.items;
        if (items && items.length > 0) {
            await saveNewBirthdayToUser(items[0]?.id);
        } else {
            await saveNewBirthday(formatedDate);
        }
    }

    const getUsers = async () => {
        const apiData = await API.graphql({
            query: listUsersLight,
            variables: {
                filter: {
                    birthdayUsersId: {
                        attributeExists: false
                    }
                }
            }
        }) as GraphQLResult<ListUsersLightQuery>;
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
        getUsers();
    }, []);

    return (
        <form
            onSubmit={handlerSubmit}
            className='form-birthday-add'
        >
            <Dropdown
                label='Qui ?'
                value={user}
                name='user'
                required
                haserror={formHasError}
                errormessage={formError}
                onChange={handleSelecteChange}
                options={users}
            />
            <div className='date'>
                <Dropdown
                    label='Jour'
                    value={day}
                    name='day'
                    required
                    haserror={formHasError}
                    onChange={handleSelecteChange}
                    options={arrayDays}
                />
                <Dropdown
                    label='Mois'
                    value={month}
                    name='month'
                    required
                    haserror={formHasError}
                    onChange={handleSelecteChange}
                    options={arrayMonth}
                />
                <Dropdown
                    label='Année'
                    value={year}
                    name='year'
                    required
                    haserror={formHasError}
                    onChange={handleSelecteChange}
                    options={arrayYear}
                />
            </div>
            <Button
                label='Enregistrer'
                type='submit'
            />
            <Toaster
                message="La date d'aniversaire de a bien été enregistrée"
                type='success'
                display={success}
            />
        </form>
    )
}

export default BirthdayFormAdd;
