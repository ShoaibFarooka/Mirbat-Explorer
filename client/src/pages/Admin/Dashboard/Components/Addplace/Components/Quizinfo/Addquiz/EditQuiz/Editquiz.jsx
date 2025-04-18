import React from 'react'
import './Editquiz.css'
import Editquestion from './Editquestions/Editquestion'
const Editquiz = () => {
    return (
        <div className='editquiz'>
            <div className='heading'>Edit Quiz</div>

            <div className='form'>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' />

                <div className='time-and-marks'>

                    <div className='time'>
                        <label htmlFor="time">Total</label>
                        <input type="text" name='time' placeholder='Time' />
                    </div>

                    <div className='marks'>
                        <label htmlFor="marks">Passing</label>
                        <input type="text" name='marks' placeholder='Marks' />
                    </div>

                </div>

                <div className='heading'>Questions</div>
                <Editquestion />
            </div>
        </div>
    )
}

export default Editquiz
