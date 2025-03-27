import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { useNavigate } from 'react-router-dom';

const quizQuestions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        id: 3,
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Leo Tolstoy"],
        correctAnswer: "William Shakespeare"
    },
    {
        id: 4,
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        correctAnswer: "Au"
    }
];

const Quiz = ({ update }) => {

    const [index, setindex] = useState(0);
    const [selected, setselected] = useState({});
    const [score, setscore] = useState(0)
    const navigate = useNavigate();

    const handleclicknext = () => {
        if (index < quizQuestions.length - 1) {
            setindex((previndex) => previndex + 1);
        }
    }

    const handlefinish = () => {
        update(score);
    }

    const handleclickprevious = () => {
        setindex((previndex) => previndex - 1);
    }

    const handleclickoption = (questionid, option) => {
        const newselected =
        {
            ...selected,
            [questionid]: option
        }
        setselected(newselected);

        if (option === quizQuestions[index].correctAnswer) {
            setscore((prev) => prev + 1);
        }

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

                <div className="question-content">{quizQuestions[index].question}</div>

                <div className='options-div'>
                    <button className="options" onClick={() => handleclickoption(quizQuestions[index].id, quizQuestions[index].options[0])}>
                        {quizQuestions[index].options[0]}
                    </button>


                    <button className="options" onClick={() => handleclickoption(quizQuestions[index].id, quizQuestions[index].options[1])}>
                        {quizQuestions[index].options[1]}
                    </button>


                    <button className="options" onClick={() => handleclickoption(quizQuestions[index].id, quizQuestions[index].options[2])}>
                        {quizQuestions[index].options[2]}</button>


                    <button className="options" onClick={() => handleclickoption(quizQuestions[index].id, quizQuestions[index].options[3])}>
                        {quizQuestions[index].options[3]}
                    </button>
                </div>


                <div className='toggel'>
                    <button className='previous-btn' onClick={handleclickprevious} disabled={index === 0}><span>{`< Previous`}</span></button>
                    <button className='next-btn' onClick={index === quizQuestions.length - 1 ? handlefinish : handleclicknext} disabled={!selected[quizQuestions[index].id]}>{index === quizQuestions.length - 1 ? `Finish >` : `Next >`}</button>
                </div>
            </div>
        </div>
    )
}

export default Quiz
