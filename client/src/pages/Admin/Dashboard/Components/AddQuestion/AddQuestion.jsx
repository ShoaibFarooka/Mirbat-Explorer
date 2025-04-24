import React, { useState } from 'react';
import './AddQuestion.css';
import { message, Select } from 'antd';
import 'antd/dist/reset.css';
import questionService from '../../../../../services/questionService';

const AddQuestion = ({ quizData, fetchAllQuestions, closeAddQuestion }) => {

    const [formData, setFormData] = useState({
        questionText: "",
        options: {
            A: "",
            B: "",
            C: "",
            D: ""
        },
        correctOption: ""
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

    const handleInputChnage = (e) => {
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
        let newerrors = {
            options: {}
        }
        let haserrros = false;

        if (formData.questionText.trim() === "") {
            newerrors.questionText = "Please write the question!";
            haserrros = false;
        } else {
            newerrors.questionText = "";
        }
        for (let key of ["A", "B", "C", "D"]) {
            if (!formData.options[key].trim()) {
                newerrors.options[key] = `Option ${key} is required!`;
                haserrros = true;
            } else {
                newerrors.options[key] = "";
            }
        }

        if (!formData.correctOption) {
            newerrors.correctOption = "Please select a correct option!";
            haserrros = true;
        } else {
            newerrors.correctOption = "";
        }

        setError(newerrors);
        return !haserrros;

    }


    const handleClickSave = async () => {
        if (!validateData()) {
            return;
        } try {
            const response = await questionService.addQuestion(quizData._id, formData);
            console.log("resposne", response);
            message.success("Queston added succesfully!");
            fetchAllQuestions();
            closeAddQuestion();
        } catch (error) {
            console.log("error", error);
            message.error("Error failed to add question!");
        }
    }

    const { Option } = Select;


    return (
        <div className='addquestion'>
            <div className='heading h1'>
                Add Question
            </div>

            <div className='form'>
                <label htmlFor="questionText">Question</label>
                <input type="text" name='questionText' placeholder='Question Here' value={formData.questionText} onChange={handleInputChnage} />
                {Error.questionText && <span className='error'>{Error.questionText}</span>}

                <div className='options'>
                    <div className='container-1'>
                        <label htmlFor="option_A" className='optionA'>Option A</label>
                        <input type="text" name='option_A' placeholder='Option A' value={formData.options.A} onChange={handleInputChnage} />
                        {Error.options.A && <span className='error'>{Error.options.A}</span>}

                        <label htmlFor="option_B" className='optionB'>Option B</label>
                        <input type="text" name='option_B' placeholder='Option B' value={formData.options.B} onChange={handleInputChnage} />
                        {Error.options.B && <span className='error'>{Error.options.B}</span>}
                    </div>

                    <div className='container-2'>
                        <label htmlFor="option_C" className='optionC'>Option C</label>
                        <input type="text" name='option_C' placeholder='Option C' value={formData.options.C} onChange={handleInputChnage} />
                        {Error.options.C && <span className='error'>{Error.options.C}</span>}

                        <label htmlFor="option_D" className='optionD'>Option D</label>
                        <input type="text" name='option_D' placeholder='Option D' value={formData.options.D} onChange={handleInputChnage} />
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
                    <button className='addquestion-save-btn' onClick={handleClickSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddQuestion;
