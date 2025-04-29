import React, { useState } from 'react';
import './Login.css';
import { message } from 'antd';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import userService from '../../../services/userService';
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.(com)$/;
        return regex.test(formData.email);
    }

    const validateData = () => {
        let newErrors = {};
        let hasErrors = false;
        if (formData.email.trim() === "") {
            newErrors.email = "Email is required!";
            hasErrors = true;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please provide a valid Email!";
            hasErrors = true;
        }
        else {
            newErrors.email = "";
        }
        if (formData.password.trim() === "") {
            newErrors.password = "Password is required!";
            hasErrors = true;
        } else {
            newErrors.password = "";
        }
        setError((prevState) => ({ ...prevState, ...newErrors }));
        return !hasErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateData()) {
            return;
        }
        try {
            //show loading
            const response = await userService.loginUser(formData);
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
                <form onSubmit={handleSubmit} className='login-form'>
                    <input type="text" name='email' placeholder='Email' value={formData.email} onChange={handleInputChange} />
                    {error.email && <span className='error'>{error.email}</span>}
                    <input type='password' name='password' value={formData.password} placeholder='Password' onChange={handleInputChange} />
                    {error.password && <span className='error'>{error.password}</span>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login;
