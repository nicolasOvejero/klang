import { Outlet, useMatch } from 'react-router-dom';
import './event-form.style.scss';

function EventForm() {
    const isMatchEventsAdd = useMatch('/admin/events/add');
    const isMatchEventsDelete = useMatch('/admin/events/delete');

   return (
        <section className='event-form'>
            {
                isMatchEventsAdd && (
                    <h2 className='title'>Ajouter un événement</h2>
                )
            }
            {
                isMatchEventsDelete && (
                    <h2 className='title'>Supprimer un événement</h2>
                )
            }
            {
                !isMatchEventsAdd && !isMatchEventsDelete && (
                    <h2 className='title'>Gestion des événements</h2>
                )
            }
            <Outlet />
        </section>
    )
}

export default EventForm;
