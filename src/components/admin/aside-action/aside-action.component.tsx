import { Link } from 'react-router-dom';
import './aside-action.stye.scss';

type AsideActionPros = {
    title: string;
    pathAdd: string;
    pathDelete: string;
    color: 'primary' | 'secondary';
}

function AsideAction(props: AsideActionPros) {
    return (
        <div className='aside-action'>
            <p className={`title ${props.color}`}>{ props.title }</p>
            <Link to={ props.pathAdd } className='link'>
                Ajouter
            </Link>
            <Link to={ props.pathDelete } className='link'>
                Supprimer
            </Link>
        </div>
    );
}

export default AsideAction;
