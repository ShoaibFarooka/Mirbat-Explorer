import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { message } from 'antd';
import 'antd/dist/reset.css';
import Pass from '../Pass/Pass';
import Failed from '../Failed/Failed';


const Quiz = ({ quiz, setisOpen }) => {
    const [index, setindex] = useState(0);
    const [selected, setselected] = useState({});
    const [score, setscore] = useState(0)
    const [isfinished, setisfinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimeup, setisTimeup] = useState(false);


    const handleclicknext = () => {
        if (selected[quiz.questions[index].id] !== undefined) {
            if (index < quiz.questions.length - 1) {
                setindex((previndex) => previndex + 1);
            }
        } else {
            message.error("Please select an option!", 1);
        }
    }

    const handlefinish = () => {
        if (selected[quiz.questions[index].id] === undefined) {
            message.error("Please select an option!", 1);
            return;
        }

        if (index < quiz.questions.length - 1) {
            handleclicknext();
        } else {
            setisfinished(true);
            setindex(0);
            setselected({});
        }
    }

    const handleclickprevious = () => {
        setindex((previndex) => previndex - 1);
    }

    const handleclickoption = (questionid, option) => {
        const prevOption = selected[questionid];
        const correctAnswer = quiz.questions[index].correctOption;

        setselected({
            ...selected,
            [questionid]: option,
        });

        if (prevOption === correctAnswer) {

            if (option !== correctAnswer) {
                setscore((prevScore) => prevScore - 1);
            }
        } else if (option === correctAnswer) {
            setscore((prevScore) => prevScore + 1);
        }
    };


    const calculateProgress = () => {
        return ((index + 1) / quiz.totalQuestions) * 100 + '%';
    };

    const questiontimer = () => {
        let totaltime = quiz.totalTime;
        setTimeLeft(totaltime);
        setisTimeup(true);
        const interval = setInterval(() => {
            if (totaltime > 0) {
                totaltime -= 1;
                setTimeLeft(totaltime);
            } else {
                clearInterval(interval);
                setisTimeup(false);
                setisfinished(true);
                setindex(0);
                setselected({});
            }
        }, 1000);

        return () => clearInterval(interval);
    };

    useEffect(() => {
        const cleanup = questiontimer();
        return cleanup;
    }, [isTimeup]);

    const retry = () => {
        setisfinished(false);
        setscore(0);
        setindex(0);
        setselected({});
        setisTimeup(false);
    }


    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return minutes > 0 ? `${minutes} minutes ${seconds < 10 ? '0' + seconds : seconds} seconds` : `${seconds} seconds`;
    }

    return isfinished ? (
        score >= quiz.passingMarks ? (
            <Pass score={score} setscore={setscore} setisfinished={setisfinished} setisOpen={setisOpen} name={quiz.name} totalQuestions={quiz.totalQuestions} />
        ) : (
            <Failed score={score} setisOpen={setisOpen} name={quiz.name} totalQuestions={quiz.totalQuestions} retry={retry} />
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
                    <button className='previous-btn' onClick={handleclickprevious} disabled={index === 0}><span>{`< Previous`}</span></button>
                    <button className='next-btn' onClick={handlefinish} > {`Next >`}</button>
                </div>
            </div>
        </div>
    )
}
export default Quiz
