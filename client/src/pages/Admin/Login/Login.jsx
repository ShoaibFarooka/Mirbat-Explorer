import React, { useState } from 'react';
import './Login.css';
import { message } from 'antd';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import userService from '../../../services/userService';
import Cookies from 'js-cookie';

const AdminLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    });

    const [error, seterror] = useState({
        email: "",
        password: ""
    });

    const handleinputchnage = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    };

    const validemail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.(com)$/;
        return regex.test(formdata.email);
    }

    const validateData = () => {
        let newerrors = {};
        let hasErrors = false;
        if (formdata.email.trim() === "") {
            newerrors.email = "Email is required!";
            hasErrors = true;
        } else if (!validemail(formdata.email)) {
            newerrors.email = "Please provide a valid Email!";
            hasErrors = true;
        }
        else {
            newerrors.email = "";
        }
        if (formdata.password.trim() === "") {
            newerrors.password = "Password is required!";
            hasErrors = true;
        } else {
            newerrors.password = "";
        }
        seterror((prevState) => ({ ...prevState, ...newerrors }));
        return !hasErrors;
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!validateData()) {
            return;
        }
        try {
            //show loading
            const response = await userService.loginUser(formdata);
            if (response.token) {
                Cookies.set('mirbat-jwt-token', response.token, {
                    secure: true,
                    sameSite: 'Lax'
                });
                const from = location.state?.from?.pathname;
                navigate(from || '/admin/dashboard');
            }
        } catch (error) {
            message.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            //hide loading
        }
    };

    return (
        <div className='admin'>
            <div className='navbar'>
                <NavLink to='/' className='logo-container'>
                    <img src={logo} alt="Logo" className='logo-img' />
                </NavLink>
            </div>
            <div className='login'>
                <div className='heading'>Admin Login</div>
                <form onSubmit={handlesubmit} className='login-form'>
                    <input type="text" name='email' placeholder='Email' value={formdata.email} onChange={handleinputchnage} />
                    {error.email && <span className='error'>{error.email}</span>}
                    <input type='password' name='password' value={formdata.password} placeholder='Password' onChange={handleinputchnage} />
                    {error.password && <span className='error'>{error.password}</span>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>

    )
}

export default AdminLogin
