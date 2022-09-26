import './user.style.scss';

export type UserModel = {
    image: string;
    firstname: string;
    lastname: string;
}

function User({ user }: { user: UserModel }) {
    return (
        <div className="user">
            <div
                className="user-image"
                style={{ backgroundImage: `url(${user.image})` }}>
            </div>
            <div className="user-name">
                <p>{user.firstname}</p>
                <p>{user.lastname}</p>
            </div>
        </div>
    );
}

export default User;
