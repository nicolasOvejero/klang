import defaultFaces from '../../assets/ufo.png';
import Action from '../action/action.component';
import './user.style.scss';

export type UserModel = {
    id: string;
    firstname: string;
    lastname: string;
    image?: string;
    job?: string;
    birthday?: string;
    arrivalDate?: string;
    mail?: string;
    size?: 'small' | 'medium';
    background?: 'bg-grey' | 'bg-white' | undefined;
    showActions?: boolean;
}

function User({ user }: { user: UserModel }) {
    return (
        <div className={ `user ${ user.size ? user.size : '' } ${ user.background ? user.background : '' }` }>
            <div
                className={`user-image ${!(user.image) ? 'default' : ''}`}
                style={{ backgroundImage: `url(${ user.image || defaultFaces })` }}>
            </div>
            <div className='user-name'>
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
                {
                    user.job && <p>{user.job}</p>
                }
                {
                    user.birthday && <p>Né(e) le {user.birthday}</p>
                }
                {
                    user.arrivalDate && <p>Arrive le {user.arrivalDate}</p>
                }
            </div>
                {            
                    user.showActions && <Action actions={[{ label: 'Envoyer un mail', action: 'mail', mail: user.mail }]} />
                }
        </div>
    );
}

export default User;
