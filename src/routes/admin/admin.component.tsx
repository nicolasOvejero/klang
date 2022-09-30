import { Outlet } from 'react-router-dom';
import AsideAction from '../../components/admin/aside-action/aside-action.component';
import './admin.style.scss';

function Admin() {
    return (
        <article className='admin'>
            <aside className='menu'>
                <AsideAction
                    title='Anniversaires'
                    pathAdd='/admin/birthdays/add'
                    pathDelete='/admin/birthdays/delete'
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
            <Outlet />
        </article>
    );
}

export default Admin;
