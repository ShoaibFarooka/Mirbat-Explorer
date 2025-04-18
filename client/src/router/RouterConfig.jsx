import Home from '../pages/Common/Home//Home.jsx'
import Maps from '../pages/Common/Maps/Maps.jsx';
import NotFound from '../pages/Common/NotFound/NotFound.jsx';

const routes = [
    { path: "/", element: <Home />, protected: false },
    { path: "/Maps", element: <Maps />, protected: false },
    { path: "*", element: <NotFound />, protected: false },
];

export default routes;