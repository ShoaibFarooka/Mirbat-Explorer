import React from 'react'
import './Editquestion.css'
import edit from '../../../../../../../../../assets/icons/edit.png';
import del from '../../../../../../../../../assets/icons/del.png';
const Editquestion = () => {
    return (
        <div className='editquestion'>
            <div className="question-placeholder">place holder</div>
            <div className="question-edit-icons">
                <button className='question-edit-btn'>
                    <img src={edit} alt="" />
                </button>
                <button className='question-delete-btn'>
                    <img src={del} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default Editquestion
