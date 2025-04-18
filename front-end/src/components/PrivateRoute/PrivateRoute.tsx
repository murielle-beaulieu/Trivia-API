import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
    const user = useSelector((state) => state.currentUser);
    return user ? <Outlet/> : <Navigate to="/auth"/>;
}

export default PrivateRoute;