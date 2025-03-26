import React from 'react'
import './Failed.css'
const Failed = () => {
    return (
        <div className='fail'>
            <div className='heading'>Quiz</div>
            <div className='location'>Location Name</div>
            <div className='failed'> You Failed
                Quiz has been completed</div>
            <div className='your-score'>Your Score</div>
            <div className='score'>5/20</div>
            <div className='btns'>
                <button className='done-btn btn-1'>Done</button>
                <button className='done-btn btn-2'>Try again</button>
            </div>
        </div>
    )
}

export default Failed
