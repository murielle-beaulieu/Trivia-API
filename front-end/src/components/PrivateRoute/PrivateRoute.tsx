import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../state/store';

function PrivateRoute() {

    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    console.log("private route: authenticated? : " + isAuth);

    return isAuth ? <Outlet/> : <Navigate to="/"/>;
}

export default PrivateRoute;