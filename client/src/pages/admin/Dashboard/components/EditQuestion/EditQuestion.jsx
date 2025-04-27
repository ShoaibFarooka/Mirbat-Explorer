import React, { useState } from 'react'
import './EditQuestion.css'
import { message, Select } from 'antd'
import questionService from '../../../../../services/questionService';
const EditQuestion = ({ questionsData, quizData, handleCloseEditQuestion, fetchAllQuestions, }) => {

    const { Option } = Select;

    const [formData, setFormData] = useState({
        questionText: questionsData?.questionText || "",
        options: {
            A: questionsData?.options?.A || "",
            B: questionsData?.options?.B || "",
            C: questionsData?.options?.C || "",
            D: questionsData?.options?.D || ""
        },
        correctOption: questionsData?.correctOption || ""
    })

    const [Error, setError] = useState({
        questionText: "",
        options: {
            A: "",
            B: "",
            C: "",
            D: ""
        },
        correctOption: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("option_")) {
            const optionkey = name.split("_")[1];
            setFormData((prev) => ({
                ...prev,
                options: {
                    ...prev.options,
                    [optionkey]: value
                }
            }))
        } else {
            setFormData((prev) => ({
                ...formData,
                [name]: value
            }))
        }
    }

    const handleSelectChange = (value) => {
        setFormData((prev) => ({
            ...formData,
            correctOption: value
        }))
    }

    const validateData = () => {
        let newErrors = {
            options: {}
        }
        let hasErrors = false;

        if (formData.questionText.trim() === "") {
            newErrors.questionText = "Please write the question!";
            hasErrors = false;
        } else {
            newErrors.questionText = "";
        }
        for (let key of ["A", "B", "C", "D"]) {
            if (!formData.options[key].trim()) {
                newErrors.options[key] = `Option ${key} is required!`;
                hasErrors = true;
            } else {
                newErrors.options[key] = "";
            }
        }

        if (!formData.correctOption) {
            newErrors.correctOption = "Please select a correct option!";
            hasErrors = true;
        } else {
            newErrors.correctOption = "";
        }

        setError(newErrors);
        return !hasErrors;

    }

    const handleClickSave = async () => {
        if (!validateData()) {
            return;
        } try {
            const response = await questionService.updateQuestion(quizData._id, questionsData._id, formData);
            console.log("response", response);
            message.success("Question updated successfully!");
            fetchAllQuestions();
            handleCloseEditQuestion();
        } catch (error) {
            console.log("error", error);
            message.error("Error Failed to update question!");
        }
    }

    const handleClickBack = () => {
        handleCloseEditQuestion();
    }

    return (
        <div className='addquestion'>
            <div className='heading h1'>
                Add Question
            </div>

            <div className='form'>
                <label htmlFor="questionText">Question</label>
                <input type="text" name='questionText' placeholder='Question Here' value={formData.questionText} onChange={handleOnChange} />
                {Error.questionText && <span className='error'>{Error.questionText}</span>}

                <div className='options'>
                    <div className='container-1'>
                        <label htmlFor="option_A" className='optionA'>Option A</label>
                        <input type="text" name='option_A' placeholder='Option A' value={formData.options.A} onChange={handleOnChange} />
                        {Error.options.A && <span className='error'>{Error.options.A}</span>}

                        <label htmlFor="option_B" className='optionB'>Option B</label>
                        <input type="text" name='option_B' placeholder='Option B' value={formData.options.B} onChange={handleOnChange} />
                        {Error.options.B && <span className='error'>{Error.options.B}</span>}
                    </div>

                    <div className='container-2'>
                        <label htmlFor="option_C" className='optionC'>Option C</label>
                        <input type="text" name='option_C' placeholder='Option C' value={formData.options.C} onChange={handleOnChange} />
                        {Error.options.C && <span className='error'>{Error.options.C}</span>}

                        <label htmlFor="option_D" className='optionD'>Option D</label>
                        <input type="text" name='option_D' placeholder='Option D' value={formData.options.D} onChange={handleOnChange} />
                        {Error.options.D && <span className='error'>{Error.options.D}</span>}
                    </div>
                </div>

                <div className='correct-option'>
                    <div className='heading'>Correct Option</div>
                    <Select
                        defaultValue={formData.correctOption || undefined}
                        style={{ width: 180 }}
                        className="custom-select"
                        popupClassName="custom-dropdown"
                        onChange={handleSelectChange}
                    >
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="C">C</Option>
                        <Option value="D">D</Option>
                    </Select>
                    {Error.correctOption && <span className='error'>{Error.correctOption}</span>}
                </div>

                <div className='addquestion-save'>
                    <button className='addquestion-back-btn' onClick={handleClickBack}>{`< Back`}</button>
                    <button className='addquestion-save-btn' onClick={handleClickSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditQuestion;
