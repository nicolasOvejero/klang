import { Outlet, useMatch } from 'react-router-dom';
import AsideAction from '../../components/admin/aside-action/aside-action.component';
import defaultBackground from '../../assets/admin-bg.png';
import './admin.style.scss';

function Admin() {
    const isMatchUsers = useMatch('/admin/users/*');
    const isMatchBirthday = useMatch('/admin/birthdays/*');
    const isMatchEvents = useMatch('/admin/events/*');
    const isMatchNewArrivals = useMatch('/admin/new-arrivals/*');
    const activeRoute = isMatchUsers || isMatchBirthday ||
        isMatchEvents || isMatchNewArrivals;

    return (
        <article className='admin'>
            <aside className='menu'>
{/*                 
                <AsideAction
                    title='Utilisateur'
                    pathAdd='/admin/users/add'
                    pathDelete='/admin/users/delete'
                    color='secondary'
                ></AsideAction>
 */}
                <AsideAction
                    title='Anniversaires'
                    pathAdd='/admin/birthdays/add'
                    color='primary'
                ></AsideAction>
                <AsideAction
                    title='Événements'
                    pathAdd='/admin/events/add'
                    pathDelete='/admin/events/delete'
                    color='secondary'
                ></AsideAction>
                <AsideAction
                    title='Nouveaux arrivants'
                    pathAdd='/admin/new-arrivals/add'
                    pathDelete='/admin/new-arrivals/delete'
                    color='primary'
                ></AsideAction>
            </aside>
            {
                activeRoute && (<Outlet />)
            }
            {
                !activeRoute && (
                    <section className='default-background'>
                        <img src={defaultBackground} alt='default background admin' />
                    </section>
                )
            }
        </article>
    );
}

export default Admin;
