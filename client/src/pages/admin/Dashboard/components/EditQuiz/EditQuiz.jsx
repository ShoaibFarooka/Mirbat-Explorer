import React, { useEffect, useState } from 'react';
import './EditQuiz.css';
import QuestionInfo from '../QuestionInfo/QuestionInfo';
import quizService from '../../../../../services/quizService';
import { message } from 'antd';


const EditQuiz = ({ quizData, placeData, fetchAllQuizzez, handleCloseEditQuiz, fetchAllQuestions, questionData, handleOpenEditPlace, handleOpenAddQuestion, handleOpenEditQuestion }) => {

    const [formData, setFormData] = useState({
        title: quizData?.title || "",
        time: quizData?.time || "",
        passingMarks: quizData?.passingMarks || ""
    })

    const [error, setError] = useState({
        title: "",
        time: "",
        passingMarks: ""
    })

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validateData = () => {
        let newErrors = {};
        let hasErrors = false;
        if (formData.title.trim() === "") {
            newErrors.title = "Title is mandatory!";
            hasErrors = true;
        } else {
            newErrors.title = ""
        }
        if (formData.time === "" || formData.time === null || formData.time === undefined) {
            newErrors.time = "Time is mandatory!";
            hasErrors = true;
        } else if (isNaN(formData.time)) {
            newErrors.time = "Time must be a valid number";
            hasErrors = true;
        }
        else {
            newErrors.time = ""
        }
        if (formData.passingMarks === "" || formData.passingMarks === null || formData.passingMarks === undefined) {
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
        if (!validateData()) {
            return;
        } try {
            const response = await quizService.updateQuiz(placeData._id, quizData._id, formData);
            console.log("response", response);
            message.success("Quiz updated succesfully!");
            fetchAllQuizzez();
            handleCloseEditQuiz();
            setIsEditPlaceOpen(true);
        } catch (error) {
            console.log("Quiz Data", quizData);
            console.log("error", error);
            message.error("Failed to update quiz!");
        }
    }

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const handleClickBack = () => {
        handleCloseEditQuiz();
        setTimeout(() => {
            handleOpenEditPlace();
        }, 300);
    }

    return (
        <div className='editquiz'>
            <div className='heading'>Edit Quiz</div>

            <div className='form'>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' value={formData.title} onChange={handleOnChange} />
                {error.title && <span className='error'>{error.title}</span>}

                <div className='time-and-marks'>

                    <div className='time'>
                        <label htmlFor="time">Total</label>
                        <input type="number" name='time' placeholder='Time' value={formData.time} onChange={handleOnChange} />
                        {error.time && <span className='error'>{error.time}</span>}
                    </div>

                    <div className='marks'>
                        <label htmlFor="passingMarks">Passing Marks</label>
                        <input type="number" name='passingMarks' placeholder='Passing Marks' value={formData.passingMarks} onChange={handleOnChange} />
                        {error.passingMarks && <span className='error'>{error.passingMarks}</span>}
                    </div>

                </div>

                <div className='quiz-save'>
                    <button className='quiz-back-btn' onClick={handleClickBack}>{`< Back`}</button>
                    <button className='quiz-save-btn' onClick={handleClickSave}>Save</button>
                </div>

                <div className='heading question'>Questions
                    <button className='add-question-btn' onClick={handleOpenAddQuestion}>Add Questions</button>
                </div>


                {questionData.map((questionsData, index) =>
                    <QuestionInfo
                        key={index}
                        questionsData={questionsData}
                        quizData={quizData}
                        fetchAllQuestions={fetchAllQuestions}
                        handleOpenEditQuestion={handleOpenEditQuestion}
                    />
                )}
            </div>
        </div>
    )
}

export default EditQuiz;
