import React from 'react'
import './Quiz.css'
import Confetti from '../../../../components/Confetti/Confetti'
const Quiz = () => {

    const handleclick = () => {
    }
    return (
        <div className='Quiz'>
            <div className='heading h-1'>Quiz</div>
            <div className='heading h-2'>Location</div>
            <div className='loading-bar'>
                <div className='counter'>Question 4/10</div>
            </div>

            <div className='timer'>2 minuets 35 seconds left</div>

            <div className='question'>

                <div className="question-content">Question Here</div>

                <div className='options-div'>
                    <button className="options">option1</button>
                    <button className="options">option2</button>
                    <button className="options">option3</button>
                    <button className="options">option4</button>
                </div>

                <div className='toggel'>
                    <button className='previous-btn'><span>{`< Previous`}</span></button>
                    <button className='next-btn'>{`Next >`}</button>
                </div>
            </div>
            {/*   <Confetti /> */}
        </div>
    )
}

export default Quiz
