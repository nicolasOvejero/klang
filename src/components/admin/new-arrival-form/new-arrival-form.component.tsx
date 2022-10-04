import { Outlet, useMatch } from 'react-router-dom';
import './new-arrival-form.style.scss';

function NewArrivalForm() {
    const isMatchNewArrivalsAdd = useMatch('/admin/new-arrivals/add');

    return (
        <section className='new-arrival-form'>
            {
                isMatchNewArrivalsAdd && (
                    <h2 className='title'>Ajouter un nouvelle arrivant</h2>
                )
            }
            {
                !isMatchNewArrivalsAdd && (
                    <h2 className='title'>Gestion des nouveaux arrivants</h2>
                )
            }
            <Outlet />
        </section>
    )
}

export default NewArrivalForm;
