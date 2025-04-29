import Home from '../pages/common/Home/Home.jsx'
import Maps from '../pages/common/Maps/Maps.jsx';
import Login from '../pages/admin/Login/Login.jsx';
import Dashboard from '../pages/admin/Dashboard/Dashboard.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';

const routes = [
    //admin
    { path: "/admin/login", element: <Login />, protected: false, authRedirect: true },
    { path: "/admin/dashboard", element: <Dashboard />, protected: true, authRedirect: false },

    //common
    { path: "/", element: <Home />, protected: false, authRedirect: false },
    { path: "/maps", element: <Maps />, protected: false, authRedirect: false },
    { path: "*", element: <NotFound />, protected: false, authRedirect: false },
];

export default routes;