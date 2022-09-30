import './user.style.scss';

export type UserModel = {
    image?: string;
    firstname: string;
    lastname: string;
    job?: string;
    size?: 'small' | 'medium';
}

function User({ user }: { user: UserModel }) {
    return (
        <div className={ `user ${ user.size ? user.size : '' }` }>
            <div
                className='user-image'
                style={{ backgroundImage: `url(${user.image})` }}>
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
