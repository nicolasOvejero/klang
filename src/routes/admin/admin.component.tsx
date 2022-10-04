import { Outlet, useMatch } from 'react-router-dom';
import AsideAction from '../../components/admin/aside-action/aside-action.component';
import defaultBackground from '../../assets/admin-bg.png';
import './admin.style.scss';
import { useState } from 'react';

function Admin() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                    color='primary'
                ></AsideAction>
            </aside>
            <section className='menu-mobile'>
                <div className='header' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <p className='title'>
                        Menu
                    </p>
                    <span className={ `icon material-symbols-outlined ${isMobileMenuOpen ? 'expanded' : ''}` }>
                        expand_more
                    </span>
                </div>
                <div className={`content ${isMobileMenuOpen ? 'expand' : ''}`}>
                    <AsideAction
                        title='Anniversaires'
                        pathAdd='/admin/birthdays/add'
                        color='primary'
                        handleClickItem={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    ></AsideAction>
                    <AsideAction
                        title='Événements'
                        pathAdd='/admin/events/add'
                        pathDelete='/admin/events/delete'
                        color='secondary'
                        handleClickItem={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    ></AsideAction>
                    <AsideAction
                        title='Nouveaux arrivants'
                        pathAdd='/admin/new-arrivals/add'
                        color='primary'
                        handleClickItem={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    ></AsideAction>
                </div>
            </section>
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
