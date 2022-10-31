import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './aside-action.stye.scss';

type AsideActionPros = {
    title: string;
    pathAdd: string;
    pathDelete?: string;
    pathConfirm?: string;
    color: 'primary' | 'secondary';
    handleClickItem?: () => void;
}

const AsideAction: React.FC<AsideActionPros> = (props: AsideActionPros) => {
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
            {
                props.pathConfirm && (
                    <Link to={ props.pathConfirm } className='link' onClick={props.handleClickItem}>
                        {t('admin.menu.confirm-events')}
                    </Link>
                )
            }
        </div>
    );
}

export default AsideAction;
