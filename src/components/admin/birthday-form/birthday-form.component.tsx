import { Outlet, useMatch } from 'react-router-dom';
import './birthday-form.style.scss';

function BirthdayForm() {
    const isMatchBirthdayAdd = useMatch('/admin/birthdays/add');

    return (
        <section className='birthday-form'>
            {
                isMatchBirthdayAdd && (
                    <h2 className='title'>Ajouter un anniversaire</h2>
                )
            }
            {
                !isMatchBirthdayAdd && (
                    <h2 className='title'>Gestion des anniversaires</h2>
                )
            }
            <Outlet />
        </section>
    )
}

export default BirthdayForm;
