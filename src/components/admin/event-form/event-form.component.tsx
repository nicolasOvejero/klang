import { useTranslation } from 'react-i18next';
import { Outlet, useMatch } from 'react-router-dom';
import './event-form.style.scss';

function EventForm() {
    const isMatchEventsAdd = useMatch('/admin/events/add');
    const isMatchEventsDelete = useMatch('/admin/events/delete');
    const { t } = useTranslation();

   return (
        <section className='event-form'>
            {
                isMatchEventsAdd && (
                   <h2 className='title'>{t('admin.events.title-add')}</h2>
                )
            }
            {
                isMatchEventsDelete && (
                    <h2 className='title'>{t('admin.events.title-delete')}</h2>
                )
            }
            {
                !isMatchEventsAdd && !isMatchEventsDelete && (
                    <h2 className='title'>{t('admin.events.title-manage')}</h2>
                )
            }
            <Outlet />
        </section>
    )
}

export default EventForm;
