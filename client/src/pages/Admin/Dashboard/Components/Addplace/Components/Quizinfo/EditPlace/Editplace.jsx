import React from 'react'
import { message } from 'antd';
import 'antd/dist/reset.css';
import Quizinfo from '../Quizinfo';
import './Editplace.css'
const Editplace = () => {

    const handleclicksave = () => {
        message.success("Place Edited Successfully!", 2);
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

            <div className='quizez-info'>
                <div className='add-quiz'>
                    <div className='heading'>Quiz</div>
                </div>
                <div className='quiz-info'>
                    <div className="heading">Title</div>
                    <div className="heading">Total Questions</div>
                    <div className="heading">Total Time</div>
                    <div className="heading">Passing Marks</div>
                    <div className="heading">Action</div>
                </div>
            </div>
            <div className='quizinfo-edit'>
                <Quizinfo />
            </div>
        </div>
    )
}

export default Editplace
