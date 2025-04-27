import React, { useState } from 'react'
import './QuizInfo.css';
import edit from '../../../../../assets/icons/edit.png';
import del from '../../../../../assets/icons/del.png';
import quizService from '../../../../../services/quizService';
import { message, Popconfirm } from 'antd';

const QuizInfo = ({ quizData, placeData, fetchAllQuizzez, handleOpenEditQuiz }) => {

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
                <button className='quiz-edit-btn' onClick={() => handleOpenEditQuiz(quizData)}>
                    <img src={edit} alt="" />
                </button>

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
