import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import Dropdown, { DropdownOption } from '../../../dropdown/dropdown.component';
import InputDate from '../../../input-date/input-date.component';
import Button from '../../../button/button.component';
import Toaster from '../../../toaster/toaster.component';
import RequestService from '../../../../common/services/new-arrivals.service';
import RequestError from '../../../../common/errors/request-error';
import UserService from '../../../../common/services/user.service';
import './new-arrival-form-add.style.scss';

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

    const upsertNewArrival = async (date: string) => {
        const newArrivalsList = await RequestService.getNewArrivals({
            filter: {
                date: {
                    eq: date
                }
            }
        });

        if (newArrivalsList && newArrivalsList.length > 0) {
            return newArrivalsList[0];
        }

        const newNewArrivals = await RequestService.createNewArrivals({
            input: {
                date: date
            }
        });

        return newNewArrivals;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!year || !month || !day || !user) {
            return;
        }

        const givenDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

        try {
            const newArrivalValue = await upsertNewArrival(givenDate);

            await UserService.udpateUser({
                input: {
                    id: user,
                    newArrivalsUsersId: newArrivalValue?.id
                }
            });

            setNewArrivals({
                ...defaultNewArrivalsAddState,
                success: true
            });
            setTimeout(() => {
                setNewArrivals(defaultNewArrivalsAddState);
            }, 2000);
        } catch (error: unknown) {
            setNewArrivals({
                ...newArrivals,
                formError: 'Une erreur est survenue'
            });

            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }
    
    const getNewUsers = async () => {
        try {
            const users = await UserService.getUserLight({
                filter: {
                    newArrivalsUsersId: {
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
            setNewArrivals({
                ...newArrivals,
                formError: 'Une erreur est survenue'
            });

            if (error instanceof RequestError) {
                console.error(error.errors);
            }
        }
    }

    useEffect(() => {
        getNewUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
