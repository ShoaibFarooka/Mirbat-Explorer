import React, { useEffect, useState } from 'react';
import './EditQuiz.css';
import QuestionInfo from '../QuestionInfo/QuestionInfo';
import quizService from '../../../../../services/quizService';
import questionService from '../../../../../services/questionService';
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import { message } from 'antd';
import Addquestion from '../AddQuestion/AddQuestion';


const EditQuiz = ({ quizData, placeData, fetchAllQuizzez, hanldeclosequizinfo }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);

    const openAddQuestion = () => {
        setIsOpen(true);
    }

    const closeAddQuestion = () => {
        setIsOpen(false);
    }

    const [formData, setFormData] = useState({
        title: quizData?.title || "",
        time: quizData?.time || "",
        passingMarks: quizData?.passingMarks || ""
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

    const validateData = () => {
        let newerrors = {};
        let haserrors = false;
        if (formData.title.trim() === "") {
            newerrors.title = "Title is mandatory!";
            haserrors = true;
        } else {
            newerrors.title = ""
        }
        if (formData.time === "" || formData.time === null || formData.time === undefined) {
            newerrors.time = "Time is mandatory!";
            haserrors = true;
        } else if (isNaN(formData.time)) {
            newerrors.time = "Time must be a valid number";
            haserrors = true;
        }
        else {
            newerrors.time = ""
        }
        if (formData.passingMarks === "" || formData.passingMarks === null || formData.passingMarks === undefined) {
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
        if (!validateData()) {
            return;
        } try {
            const response = await quizService.updateQuiz(placeData._id, quizData._id, formData);
            console.log("response", response);
            message.success("Quiz updated succesfully!");
            fetchAllQuizzez();
            hanldeclosequizinfo();
        } catch (error) {
            console.log("error", error);
            message.error("Failed to update quiz!");
        }
    }

    const fetchAllQuestions = async () => {
        try {
            const resposne = await questionService.getAllQuestions(quizData._id);
            console.log("response", resposne);
            setQuestionsData(resposne.questions);
        } catch (error) {
            console.log("error", error);
            message.error("No quiz avalaibel!");
        }
    }

    useEffect(() => {
        fetchAllQuestions()
    }, [])


    return (
        <div className='editquiz'>
            <div className='heading'>Edit Quiz</div>

            <div className='form'>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' value={formData.title} onChange={handleInputChnage} />
                {Error.title && <span className='error'>{Error.title}</span>}

                <div className='time-and-marks'>

                    <div className='time'>
                        <label htmlFor="time">Total</label>
                        <input type="number" name='time' placeholder='Time' value={formData.time} onChange={handleInputChnage} />
                        {Error.time && <span className='error'>{Error.time}</span>}
                    </div>

                    <div className='marks'>
                        <label htmlFor="passingMarks">Passing Marks</label>
                        <input type="number" name='passingMarks' placeholder='Passing Marks' value={formData.passingMarks} onChange={handleInputChnage} />
                        {Error.passingMarks && <span className='error'>{Error.passingMarks}</span>}
                    </div>

                </div>

                <div className='quiz-save'>
                    <button className='quiz-save-btn' onClick={handleClickSave}>Save</button>
                </div>

                <div className='heading question'>Questions
                    <button className='add-question-btn' onClick={openAddQuestion}>Add Questions</button>
                </div>

                <CustomModal
                    isOpen={isOpen}
                    onRequestClose={closeAddQuestion}
                    contentLabel={"Add Question"}
                >
                    <Addquestion
                        quizData={quizData}
                        fetchAllQuestions={fetchAllQuestions}
                        closeAddQuestion={closeAddQuestion}
                    />
                </CustomModal>


                {questionsData.map((questionsdata, index) =>
                    <QuestionInfo
                        key={index}
                        questionsdata={questionsdata}
                        quizData={quizData}
                        fetchAllQuestions={fetchAllQuestions}
                    />
                )}
            </div>
        </div>
    )
}

export default EditQuiz;
