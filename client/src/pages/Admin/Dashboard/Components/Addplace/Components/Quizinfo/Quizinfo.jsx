import React, { useState } from 'react'
import './Quizinfo.css'
import edit from '../../../../../../../assets/icons/edit.png'
import del from '../../../../../../../assets/icons/del.png'
import Editquiz from './Addquiz/EditQuiz/Editquiz'
import CustomModal from '../../../../../../../components/CustomModal/CustomModal'
const Quizinfo = () => {
    const [isOpenquizinfo, setisOpenquizinfo] = useState(false);

    const handleeditquiz = () => {
        setisOpenquizinfo(true);
    }

    const hanldeclosequizinfo = () => {
        setisOpenquizinfo(false);
    }

    return (
        <div className='quizinfo'>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-placeholder">place holder</div>
            <div className="quiz-edit-icons">
                <button className='quiz-edit-btn' onClick={handleeditquiz}>
                    <img src={edit} alt="" />
                </button>
                <CustomModal isOpen={isOpenquizinfo} onRequestClose={hanldeclosequizinfo} contentLabel={"Edit Quiz"}>
                    <Editquiz />
                </CustomModal>
                <button className='quiz-delete-btn'>
                    <img src={del} alt="delete" />
                </button>
            </div>
        </div>
    )
}

export default Quizinfo
