import moment from 'moment';
import 'moment/locale/fr';
import { ChangeEvent, FormEvent, useState } from 'react';
import RequestError from '../../../../common/errors/request-error';
import EventService from '../../../../common/services/event.service';
import RequestService from '../../../../common/services/new-arrivals.service';
import Button from '../../../button/button.component';
import InputDate from '../../../input-date/input-date.component';
import InputForm from '../../../input-form/input-form.component';
import Toaster from '../../../toaster/toaster.component';
import './event-form-add.style.scss';

const defaultEventAddState = {
    image: '',
    type: '',
    address_city: '',
    address_street: '',
    day: '',
    month: '',
    year: '',
    schedule: '',
    formHasError: false,
    formError: '',
    success: false
};

export type Address = {
    id: string;
    city: string | null | undefined;
    street: string | null | undefined;
}

function EventFormAdd() {
    const [eventAddState, setEventAddState] = useState(defaultEventAddState);
    const { image, type, schedule,
        address_city, address_street,
        day, month, year,
        formHasError, formError, success
    } = eventAddState;

    const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setEventAddState({
            ...eventAddState,
            [name]: value,
            formHasError: false,
            formError: ''
        });
    }
    
    const saveEvent = async(newAddress: Address) => {
        const formatedDate = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;

        await EventService.createEvent({
            input: {
                image,
                type,
                schedule,
                date: formatedDate,
                eventAddressId: newAddress.id
            }
        });

        setEventAddState({
            ...defaultEventAddState,
            success: true
        });
        setTimeout(() => {
            setEventAddState(defaultEventAddState);
        }, 2000)
    }

    const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image || !type || !schedule ||
            !address_city || !address_street ||
            !day || !month || !year
        ) {
            return;
        }

        try {
            const newAddress = await RequestService.createAddress({
                input: {
                    city: address_city,
                    street: address_street
                }
            });

            newAddress && await saveEvent(newAddress);
        } catch (error: unknown) {
            if (error instanceof RequestError) {
                console.error(error.errors);
            }
            setEventAddState({
                ...eventAddState,
                formHasError: true,
                formError: "Impossible d'ajouter l'événement"
            });
        }

    }

    return (
        <form
            onSubmit={handlerSubmit}
            className='form-event-add'
        >
            <InputForm
                label="Image de l'endroit"
                type='text'
                required
                onChange={handleChange}
                name='image'
                value={image}
                haserror={formError !== ''}
                errormessage={formError}
            />
            <InputForm
                label="Type d'événement"
                type='text'
                required
                onChange={handleChange}
                name='type'
                value={type}
                haserror={formError !== ''}
                errormessage={formError}
            />
            <InputForm
                label="Horaire"
                type='text'
                required
                onChange={handleChange}
                name='schedule'
                value={schedule}
                haserror={formError !== ''}
                errormessage={formError}
            />
            <InputForm
                label="Ville"
                type='text'
                required
                onChange={handleChange}
                name='address_city'
                value={address_city}
                haserror={formError !== ''}
                errormessage={formError}
            />
            <InputForm
                label="Rue"
                type='text'
                required
                onChange={handleChange}
                name='address_street'
                value={address_street}
                haserror={formError !== ''}
                errormessage={formError}
            />
            <InputDate
                day={{ value: day, formHasError, onChange: handleChange }}
                month={{ value: month, formHasError, onChange: handleChange }}
                year={{ value: year, formHasError, onChange: handleChange }}
                startDateYear={moment().year()}
                endDateYear={moment().year()+10}
            />
            <Button
                label='Enregistrer'
                type='submit'
            />
            <Toaster
                message="Nouvel événement créé"
                type='success'
                display={success}
            />
        </form>
    )
}

export default EventFormAdd;
