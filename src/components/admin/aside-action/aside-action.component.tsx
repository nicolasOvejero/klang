import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './aside-action.stye.scss';

type AsideActionPros = {
    title: string;
    pathAdd: string;
    pathDelete?: string;
    color: 'primary' | 'secondary';
    handleClickItem?: () => void;
}

function AsideAction(props: AsideActionPros) {
    const { t } = useTranslation();

    return (
        <div className='aside-action'>
            <p className={`title ${props.color}`}>{ props.title }</p>
            <Link to={ props.pathAdd } className='link' onClick={props.handleClickItem}>
                {t('admin.menu.add')}
            </Link>
            {
                props.pathDelete && (
                    <Link to={ props.pathDelete } className='link' onClick={props.handleClickItem}>
                        {t('admin.menu.delete')}
                    </Link>
                )
            }
        </div>
    );
}

export default AsideAction;
