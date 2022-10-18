import { useTranslation } from 'react-i18next';
import { Outlet, useMatch } from 'react-router-dom';
import './new-arrival-form.style.scss';

function NewArrivalForm() {
    const isMatchNewArrivalsAdd = useMatch('/admin/new-arrivals/add');
    const { t } = useTranslation();

    return (
        <section className='new-arrival-form'>
            {
                isMatchNewArrivalsAdd && (
                    <h2 className='title'>{t('admin.new-arrivals.title-add')}</h2>
                )
            }
            {
                !isMatchNewArrivalsAdd && (
                    <h2 className='title'>{t('admin.new-arrivals.title-manage')}</h2>
                )
            }
            <Outlet />
        </section>
    )
}

export default NewArrivalForm;
