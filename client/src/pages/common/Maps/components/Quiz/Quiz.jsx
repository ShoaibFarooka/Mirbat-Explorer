import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { message } from 'antd';
import Pass from '../Pass/Pass';
import Failed from '../Failed/Failed';

const Quiz = ({ quiz, setIsOpen }) => {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState({});
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimeUp, setIsTimeUp] = useState(false);


    const handleClickNext = () => {
        if (selected[quiz.questions[index].id] !== undefined) {
            if (index < quiz.questions.length - 1) {
                setIndex((previndex) => previndex + 1);
            }
        } else {
            message.error("Please select an option!", 1);
        }
    }

    const handleFinish = () => {
        if (selected[quiz.questions[index].id] === undefined) {
            message.error("Please select an option!", 1);
            return;
        }

        if (index < quiz.questions.length - 1) {
            handleClickNext();
        } else {
            setIsFinished(true);
            setIndex(0);
            setSelected({});
        }
    }

    const handleClickPrevious = () => {
        setIndex((previndex) => previndex - 1);
    }

    const handleclickoption = (questionid, option) => {
        const prevOption = selected[questionid];
        const correctAnswer = quiz.questions[index].correctOption;

        setSelected({
            ...selected,
            [questionid]: option,
        });

        if (prevOption === correctAnswer) {

            if (option !== correctAnswer) {
                setScore((prevScore) => prevScore - 1);
            }
        } else if (option === correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }
    };


    const calculateProgress = () => {
        return ((index + 1) / quiz.totalQuestions) * 100 + '%';
    };

    const questionTimer = () => {
        let totalTime = quiz.totalTime;
        setTimeLeft(totalTime);
        setIsTimeUp(true);
        const interval = setInterval(() => {
            if (totalTime > 0) {
                totalTime -= 1;
                setTimeLeft(totalTime);
            } else {
                clearInterval(interval);
                setIsTimeUp(false);
                setIsFinished(true);
                setIndex(0);
                setSelected({});
            }
        }, 1000);

        return () => clearInterval(interval);
    };

    useEffect(() => {
        const cleanup = questionTimer();
        return cleanup;
    }, [isTimeUp]);

    const retry = () => {
        setIsFinished(false);
        setScore(0);
        setIndex(0);
        setSelected({});
        setIsTimeUp(false);
    }


    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return minutes > 0 ? `${minutes} minutes ${seconds < 10 ? '0' + seconds : seconds} seconds` : `${seconds} seconds`;
    }

    return isFinished ? (
        score >= quiz.passingMarks ? (
            <Pass score={score} setScore={setScore} setIsFinished={setIsFinished} setIsOpen={setIsOpen} name={quiz.name} totalQuestions={quiz.totalQuestions} />
        ) : (
            <Failed score={score} setIsOpen={setIsOpen} name={quiz.name} totalQuestions={quiz.totalQuestions} retry={retry} />
        )
    ) : (
        <div className='Quiz'>
            <div className='heading h-1'>Quiz</div>
            <div className='heading h-2'>{quiz.name}</div>
            <div className='loading-bar'>
                <div className='counter' style={{ width: calculateProgress() }}> {index + 1}/{quiz.totalQuestions}</div>
            </div>

            <div className='timer'>{formatTime()}</div>


            <div className='question'>
                {
                    <>
                        <div className="question-content" key={quiz.questions[index].id}>{quiz.questions[index].title}</div>
                        <div className='options-div'>
                            {Object.entries(quiz.questions[index].options).map(([key, value]) => (
                                <button key={key} className={`options ${selected[quiz.questions[index].id] === key ? 'selected' : ''}`}
                                    onClick={() => handleclickoption(quiz.questions[index].id, key)}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </>
                }

                <div className='toggel'>
                    <button className='previous-btn' onClick={handleClickPrevious} disabled={index === 0}><span>{`< Previous`}</span></button>
                    <button className='next-btn' onClick={handleFinish} > {`Next >`}</button>
                </div>
            </div>
        </div>
    )
}
export default Quiz;
