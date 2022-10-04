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
    return (
        <div className='aside-action'>
            <p className={`title ${props.color}`}>{ props.title }</p>
            <Link to={ props.pathAdd } className='link' onClick={props.handleClickItem}>
                Ajouter
            </Link>
            {
                props.pathDelete && (
                    <Link to={ props.pathDelete } className='link' onClick={props.handleClickItem}>
                        Supprimer
                    </Link>
                )
            }
        </div>
    );
}

export default AsideAction;
