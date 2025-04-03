import React, { useState } from 'react';
import './AdminLogin.css';
import { message } from 'antd';
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
const AdminLogin = () => {
    const [formdata, setformdata] = useState({
        username: "",
        password: ""
    });

    const handleinputchnage = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!formdata.username) {
            message.error("Username is required!", 1);
            return
        }
        if (!formdata.password) {
            message.error("Password is required!", 1);
            return
        }
        console.log("Login Attempt", formdata);
        message.success("Login successfull!", 1);
    }
    return (
        <>
            <div className='navbar'>
                <NavLink to='/' className='logo-container'>
                    <img src={logo} alt="Logo" className='logo-img' />
                </NavLink>
            </div>
            <div className='admin'>
                <div className='heading'>Admin Login</div>
                <form onSubmit={handlesubmit} className='login-form'>
                    <input type="text" name='username' placeholder='Username' value={formdata.username} onChange={handleinputchnage} />
                    <input type='password' name='password' value={formdata.password} placeholder='Password' onChange={handleinputchnage} />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </>

    )
}

export default AdminLogin
