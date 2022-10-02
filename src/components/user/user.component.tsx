import defaultFaces from '../../assets/ufo.png';
import './user.style.scss';

export type UserModel = {
    id: string;
    firstname: string;
    lastname: string;
    image?: string;
    job?: string;
    size?: 'small' | 'medium';
}

function User({ user }: { user: UserModel }) {
    return (
        <div className={ `user ${ user.size ? user.size : '' }` }>
            <div
                className='user-image'
                style={{ backgroundImage: `url(${ user.image || defaultFaces })` }}>
            </div>
            <div className='user-name'>
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
                {
                    user.job && <p>{user.job}</p>
                }
            </div>
        </div>
    );
}

export default User;
