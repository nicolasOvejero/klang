import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Dropdown, { DropdownOption } from '../../../dropdown/dropdown.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import InputDate from '../../../input-date/input-date.component';
import RequestError from '../../../../common/errors/request-error';
import UserService from '../../../../common/services/user.service';
import BirthdayService from '../../../../common/services/birthday.service';
import moment from 'moment';
import 'moment/locale/fr';
import './birthday-form-add.style.scss';

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
            throw new Error('No birthday ID found');
        }

        await UserService.udpateUser({
            input: {
                id: user, 
                birthdayUsersId: birthdayId
            }
        });

        setBirthdayAddState({
            ...defaultBirthdayAddState,
            success: true
        });
        setTimeout(() => {
            setBirthdayAddState(defaultBirthdayAddState);
        }, 2000);
    }

    const saveNewBirthday = async (date: string) => {
        const newBirthday = await BirthdayService.createBirthday({
            input: {
                date
            }
        });

        newBirthday && await saveNewBirthdayToUser(newBirthday.id);        
    }

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user || !day || !month || !year) {
            return;
        }
        
        try {
            const formatedDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
            const birthdays = await BirthdayService.getBirthdaysLight({
                filter: {
                    date: {
                        eq: formatedDate
                    }
                }
            });

            if (birthdays.length > 0) {
                await saveNewBirthdayToUser(birthdays[0]?.id);
            } else {
                await saveNewBirthday(formatedDate);
            }
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }

            setBirthdayAddState({
                ...birthdayAddState,
                formHasError: true,
                formError: 'Une erreur est survenue'
            });
        }
    }

    const getUsers = async () => {
        try {
            const users = await UserService.getUserLight({
                filter: {
                    birthdayUsersId: {
                        attributeExists: false
                    }
                }
            });

            setUsers([{
                    value: '',
                    label: ''
                }].concat(users.map((user) => {
                    return {
                        label: `${user.firstname} ${user.lastname}`,
                        value: user.id,
                    }
                }))
            );
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <InputDate
                day={{ value: day, formHasError, onChange: handleSelecteChange }}
                month={{ value: month, formHasError, onChange: handleSelecteChange }}
                year={{ value: year, formHasError, onChange: handleSelecteChange }}
                startDateYear={1950}
                endDateYear={moment().year()}
            ></InputDate>
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
