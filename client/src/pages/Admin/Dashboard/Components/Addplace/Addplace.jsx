import React, { useState } from 'react'
import './Addplace.css'
import Quizinfo from './Components/Quizinfo/Quizinfo'
import Addquiz from './Components/Quizinfo/Addquiz/Addquiz'
import { message } from 'antd';
import 'antd/dist/reset.css';
const Addplace = ({ onRequestClose }) => {
    const [show, setshow] = useState(false);
    const [stylebackbtn, setstylebackbtn] = useState(false);

    const handleclicksave = () => {
        message.success("Place Added Successfully!", 2);
    }

    const handleaddquiz = () => {
        setshow(true);
    }

    return (
        <div className='add-place'>
            <div className="heading">Place Information</div>
            <div className='form'>
                <label htmlFor="place name" className='label'>Place name</label>
                <input type="text" name='place name' placeholder='Place name' />
                <label htmlFor="Description" className='label description'>Description</label>
                <input type="text" name='Description' placeholder='Description' />
                <div className='position'>
                    <div className='longitude'>
                        <label htmlFor="longitude" className='label'>Longitude</label>
                        <input type="text" name='longitude' placeholder='Longitude' />
                    </div>
                    <div className='latitude'>
                        <label htmlFor="latitude" className='label'>Latitude</label>
                        <input type="text" name='latitude' placeholder='Latitude' />
                    </div>
                </div>
            </div>

            <div className='save'><button className='save-btn' onClick={handleclicksave}>Save</button></div>
        </div>
    )
}

export default Addplace
