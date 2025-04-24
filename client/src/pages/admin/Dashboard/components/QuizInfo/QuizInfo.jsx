import React, { useState } from 'react'
import './QuizInfo.css';
import edit from '../../../../../assets/icons/edit.png';
import del from '../../../../../assets/icons/del.png';
import Editquiz from '../EditQuiz/EditQuiz';
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import quizService from '../../../../../services/quizService';
import { message, Popconfirm } from 'antd';

const QuizInfo = ({ quizData, placeData, fetchAllQuizzez }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenEditQuiz = () => {
        setIsOpen(true);
    }

    const hanldeCloseQuizInfo = () => {
        setIsOpen(false);
    }

    const handleDeleteQuiz = async (placeid, quizid) => {
        try {
            const response = await quizService.deleteQuiz(placeid, quizid);
            console.log("response", response);
            fetchAllQuizzez();
            message.success("Quiz deleted successfully!");
        } catch (error) {
            console.log("error", error);
            message.error("Error Failed to delete quiz!");
        }
    }


    return (
        <div className='quizinfo'>
            <div className="quiz-placeholder title">{quizData.title}</div>
            <div className="quiz-placeholder time">{quizData.time}</div>
            <div className="quiz-placeholder passingmarks">{quizData.passingMarks}</div>
            <div className="quiz-edit-icons">
                <button className='quiz-edit-btn' onClick={handleOpenEditQuiz}>
                    <img src={edit} alt="" />
                </button>
                <CustomModal isOpen={isOpen} onRequestClose={hanldeCloseQuizInfo} contentLabel={"Edit Quiz"}>
                    <Editquiz quizData={quizData} placeData={placeData} fetchAllQuizzez={fetchAllQuizzez} hanldeCloseQuizInfo={hanldeCloseQuizInfo} />
                </CustomModal>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDeleteQuiz(placeData._id, quizData._id)}
                    onCancel={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className='quiz-delete-btn'>
                        <img src={del} alt="delete" />
                    </button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default QuizInfo;
