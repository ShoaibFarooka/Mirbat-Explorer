import React from 'react'
import './Addquiz.css'
import { Select } from 'antd';
import 'antd/dist/reset.css';

const Addquiz = () => {

    const { Option } = Select;
    return (
        <div className='addquiz'>

            <div className='heading'>Add Quiz</div>

            <div className='addquestion-btn'>
                <button className='addquestionbtn'>Add Question</button>
            </div>

            <div className='form'>

                <label htmlFor="title">Title</label>
                <input type="text" name='title' placeholder='Title' />

                <div className='time-and-marks'>

                    <div className='time'>
                        <label htmlFor="time">Total Time</label>
                        <input type="text" name='time' placeholder='Time' />
                    </div>

                    <div className='marks'>
                        <label htmlFor="marks">Total Marks</label>
                        <input type="text" name='marks' placeholder='Marks' />
                    </div>

                </div>

                <div className='question'>
                    <label htmlFor="question">Question</label>
                    <input type="text" name='question' placeholder='Question' />
                </div>

                <div className='options'>

                    <div className='cont-1'>
                        <label htmlFor="option1">A</label>
                        <input type="text" name='option1' placeholder='Option A' />

                        <label htmlFor="option2" className='option-b'>B</label>
                        <input type="text" name='option2' placeholder='Option B' />
                    </div>

                    <div className='cont-2'>
                        <label htmlFor="option3">C</label>
                        <input type="text" name='option3' placeholder='Option C' />

                        <label htmlFor="option4" className='option-d'>D</label>
                        <input type="text" name='option4' placeholder='Option D' />
                    </div>

                </div>

                <div className='correct-option'>
                    <label htmlFor="correct">Correct Option</label>
                    <Select className='correct' placeholder="Option" popupClassName='custom-popup'>
                        <Option value="" className='option-list'>Option</Option>
                        <Option value="A" className='option-list'>A</Option>
                        <Option value="B" className='option-list'>B</Option>
                        <Option value="C" className='option-list'>C</Option>
                        <Option value="D" className='option-list'>D</Option>
                    </Select>
                </div>

                <div className='btns'>
                    <button className='quiz-cancel-btn'>Cancel</button>
                    <button className='quiz-save-btn'>Save</button>
                </div>

            </div>
        </div >
    )
}

export default Addquiz
