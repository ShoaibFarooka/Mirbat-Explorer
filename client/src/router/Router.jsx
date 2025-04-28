import { Route, Routes } from 'react-router-dom';
import routes from './RouterConfig.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'
import AuthenticatedRedirect from '../components/AuthenticatedRedirect/AuthenticatedRedirect.jsx';

const Router = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        route.protected ? (
                            <ProtectedRoute>{route.element}</ProtectedRoute>)
                            :
                            route.authRedirect ? (
                                <AuthenticatedRedirect>
                                    {route.element}
                                </AuthenticatedRedirect>)
                                :
                                (route.element)
                    }
                />
            ))}
        </Routes>
    );
};

export default Router;