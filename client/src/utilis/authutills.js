import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const token = Cookies.get('mirbat-jwt-token');
    return !!token;
};


export { isAuthenticated };