import React, { useState } from 'react'
import './AddQuiz.css'
import quizService from '../../../../../services/quizService';
import { message } from 'antd'

const AddQuiz = ({ closeAddQuizModal, placeData, setIsEditPlaceOpen }) => {

    const [formData, setFormData] = useState({
        title: "",
        time: "",
        passingMarks: ""
    })

    const [error, setError] = useState({
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

    const handleClickBack = () => {
        closeAddQuizModal();
        setTimeout(() => {
            setIsEditPlaceOpen(true);
        }, 300);
    }


    const validatedata = () => {
        let newErrors = {};
        let hasErrors = false;
        if (formData.title.trim() === "") {
            newErrors.title = "Title is mandatory!";
            hasErrors = true;
        } else {
            newErrors.title = ""
        }
        if (formData.time.trim() === "" || formData.time === null || formData.time === undefined) {
            newErrors.time = "Time is mandatory!";
            hasErrors = true;
        } else if (isNaN(formData.time)) {
            newErrors.time = "Time must be a valid number";
            hasErrors = true;
        }
        else {
            newErrors.time = ""
        }
        if (formData.passingMarks.trim() === "" || formData.passingMarks === null || formData.passingMarks === undefined) {
            newErrors.passingMarks = "PassingMarks are mandatory!";
            hasErrors = true;
        } else if (isNaN(formData.passingMarks)) {
            newErrors.passingMarks = "PassingMarks must be a valid number";
            hasErrors = true;
        }
        else {
            newErrors.passingMarks = "";
        }
        setError((prev) => ({ ...prev, ...newErrors }));
        return !hasErrors;
    }

    const handleClickSave = async () => {
        if (!validatedata()) {
            return;
        }
        try {
            const response = await quizService.addQuiz(placeData._id, formData);
            console.log('response', response);
            message.success("Quiz added succesfully!");
            closeAddQuizModal();
        } catch (error) {
            console.log("error", error);
            message.error("error failed to add quiz! ");
        }
    }
    return (
        <div className='addquiz'>
            <div className='heading'>Add Quiz</div>

            <div className='form'>

                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' onChange={handleInputChnage} />
                {error.title && <span className='error'>{error.title}</span>}

                <div className='time-and-marks'>
                    <div className='time'>
                        <label htmlFor="time">Total Time</label>
                        <input type="number" name='time' placeholder='Time' onChange={handleInputChnage} />
                        {error.time && <span className='error'>{error.time}</span>}
                    </div>

                    <div className='marks'>
                        <label htmlFor="passingMarks">Passing Marks</label>
                        <input type="number" name='passingMarks' placeholder='PassingMarks' onChange={handleInputChnage} />
                        {error.passingMarks && <span className='error'>{error.passingMarks}</span>}
                    </div>
                </div>

                <div className='btns'>
                    <button
                        className='quiz-back-btn'
                        onClick={handleClickBack}
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
