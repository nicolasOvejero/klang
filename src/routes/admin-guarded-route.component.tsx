import { Navigate } from 'react-router-dom';

type GuardedRouteProps = {
	groups: string[] | undefined;
	children: JSX.Element;
};

const AdminGuardedRoute = ({ groups, children }: GuardedRouteProps) => {
	if (groups === undefined) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}
	if (!groups.includes('admin') && !groups.includes('eventCreation') && !groups.includes('eventValidation')) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}
	return children;
};

export default AdminGuardedRoute;
