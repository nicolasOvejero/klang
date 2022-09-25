import { Navigate } from "react-router-dom";

type GuardedRouteProps = {
    auth: boolean;
    children: JSX.Element;
}

const GuardedRoute =
    ({ auth, children }: GuardedRouteProps) => {
        if (auth !== true) {
            return <Navigate to='/login' replace />;
        }
        return children
    }

export default GuardedRoute;
