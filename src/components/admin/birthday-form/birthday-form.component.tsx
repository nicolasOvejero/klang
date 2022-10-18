import { useTranslation } from 'react-i18next';
import { Outlet, useMatch } from 'react-router-dom';
import './birthday-form.style.scss';

function BirthdayForm() {
    const isMatchBirthdayAdd = useMatch('/admin/birthdays/add');
    const { t } = useTranslation();

    return (
        <section className='birthday-form'>
            {
                isMatchBirthdayAdd && (
                    <h2 className='title'>{t('admin.birthdays.title-add')}</h2>
                )
            }
            {
                !isMatchBirthdayAdd && (
                    <h2 className='title'>{t('admin.birthdays.title-manage')}</h2>
                )
            }
            <Outlet />
        </section>
    )
}

export default BirthdayForm;
