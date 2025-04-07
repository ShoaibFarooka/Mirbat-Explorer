import React from 'react'
import './Quizinfo.css'
import edit from '../../../../../../assets/icons/edit.png'
import del from '../../../../../../assets/icons/del.png'
const Quizinfo = () => {
    return (
        <div className='quizinfo'>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-edit-icons">
                <button className='quiz-edit-btn'>
                    <img src={edit} alt="" />
                </button>
                <button className='quiz-delete-btn'>
                    <img src={del} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default Quizinfo
