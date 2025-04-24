import React, { useState } from 'react'
import './AddQuiz.css'
import quizService from '../../../../../services/quizService';
import { message } from 'antd'

const AddQuiz = ({ closeAddQuizModal, placeData, fetchAllQuizzez }) => {

    const [formData, setFormData] = useState({
        title: "",
        time: "",
        passingMarks: ""
    })

    const [Error, setError] = useState({
        title: "",
        time: "",
        passingMarks: ""
    })

    const handleInputChnage = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validatedata = () => {
        let newerrors = {};
        let haserrors = false;
        if (formData.title.trim() === "") {
            newerrors.title = "Title is mandatory!";
            haserrors = true;
        } else {
            newerrors.title = ""
        }
        if (formData.time.trim() === "" || formData.time === null || formData.time === undefined) {
            newerrors.time = "Time is mandatory!";
            haserrors = true;
        } else if (isNaN(formData.time)) {
            newerrors.time = "Time must be a valid number";
            haserrors = true;
        }
        else {
            newerrors.time = ""
        }
        if (formData.passingMarks.trim() === "" || formData.passingMarks === null || formData.passingMarks === undefined) {
            newerrors.passingMarks = "PassingMarks are mandatory!";
            haserrors = true;
        } else if (isNaN(formData.passingMarks)) {
            newerrors.passingMarks = "PassingMarks must be a valid number";
            haserrors = true;
        }
        else {
            newerrors.passingMarks = "";
        }
        setError((prev) => ({ ...prev, ...newerrors }));
        return !haserrors;
    }

    const handleClickSave = async () => {
        if (!validatedata()) {
            return;
        }
        try {
            const response = await quizService.addQuiz(placeData._id, formData);
            console.log('response', response);
            message.success("Quiz added succesfully!");
            fetchAllQuizzez();
            closeAddQuizModal();
        } catch (error) {
            console.log("error", error);
            message.error("Error failed to add quiz! ");
        }
    }
    return (
        <div className='addquiz'>
            <div className='heading'>Add Quiz</div>

            <div className='form'>

                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' onChange={handleInputChnage} />
                {Error.title && <span className='error'>{Error.title}</span>}

                <div className='time-and-marks'>
                    <div className='time'>
                        <label htmlFor="time">Total Time</label>
                        <input type="number" name='time' placeholder='Time' onChange={handleInputChnage} />
                        {Error.time && <span className='error'>{Error.time}</span>}
                    </div>

                    <div className='marks'>
                        <label htmlFor="passingMarks">Passing Marks</label>
                        <input type="number" name='passingMarks' placeholder='PassingMarks' onChange={handleInputChnage} />
                        {Error.passingMarks && <span className='error'>{Error.passingMarks}</span>}
                    </div>
                </div>

                <div className='btns'>
                    <button
                        className='quiz-back-btn'
                        onClick={closeAddQuizModal}
                    >
                        {`< Back`}
                    </button>

                    <button
                        className='quiz-save-btn'
                        onClick={handleClickSave}
                    >
                        Save
                    </button>

                </div>

            </div>
        </div >
    )
}

export default AddQuiz;
