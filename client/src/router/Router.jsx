import { Route, Routes } from 'react-router-dom';
import routes from './RouterConfig.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'

const Router = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={<ProtectedRoute isProtected={route.protected}>
                        {route.element}
                    </ProtectedRoute>}
                />
            ))}
        </Routes>
    );
};

export default Router;