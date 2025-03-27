import React from 'react'
import './Failed.css'
const Failed = ({ score, setfinished, setisOpen }) => {
    const handleclicktryagain = () => {
        setfinished(false);
    }

    const handleclcikdone = () => {
        setisOpen(false);
    }
    return (
        <div className='fail'>
            <div className='heading'>Quiz</div>
            <div className='location'>Location Name</div>
            <div className='failed'> You Failed
                Quiz has been completed</div>
            <div className='your-score'>Your Score</div>
            <div className='score'>{score}</div>
            <div className='btns'>
                <button className='done-btn btn-1' onClick={handleclcikdone}>Done</button>
                <button className='done-btn btn-2' onClick={handleclicktryagain}>Try again</button>
            </div>
        </div>
    )
}

export default Failed
