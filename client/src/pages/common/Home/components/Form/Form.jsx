import { useState } from 'react';
import './Form.css';
import { message } from 'antd';
import userService from '../../../../../services/userService';

const Form = ({ handleClose }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateData = () => {
        let hasError = false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setEmailError("Email is required");
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError("Email is invalid");
            hasError = true;
        } else {
            setEmailError("");
        }

        return !hasError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateData()) {
            return;
        }
        try {
            const response = await userService.addLead({ email });
            message.success(response.message);
            localStorage.setItem("email", email);
            handleClose();
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="e-form">
            <h2 className="popup-heading">Enter Your Email</h2>
            <form className="email-form" onSubmit={handleSubmit}>
                <div className='email-input-container'>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div className='email-error'>{emailError}</div>}
                </div>
                <button type="submit" className="popup-btn">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default Form;