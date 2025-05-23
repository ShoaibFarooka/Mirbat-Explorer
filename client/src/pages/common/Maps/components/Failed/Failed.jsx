import React from 'react';
import './Failed.css';
import { message } from 'antd';

const Failed = ({ score, setIsOpen, name, totalQuestions, retry, setIsFinished, setScore }) => {
    const handleclicktryagain = () => {
        retry();
    }

    const handleclcikdone = () => {
        setIsFinished(false);
        setScore(0);
        setIsOpen(false);
    };

    const handleShareScore = () => {
        const shareText = `I scored ${score}/${totalQuestions} on the ${name} quiz! Test your knowledge of Mirbat sites and share your score too! ${window.location.origin}`;
        navigator.clipboard.writeText(shareText)
            .then(() => {
                message.success("Text copied to clipboard!")
            })
            .catch((err) => {
                message.error("Failed to copy text!");
            });
    };

    return (
        <div className='fail'>
            <div className='heading'>Quiz</div>
            <div className='location'>{name}</div>
            <div className='failed'> Not quite there yet
                give it another try
            </div>
            <div className='your-score'>Your Score</div>
            <div className='score'>{`${score}/${totalQuestions}`}</div>
            <div className='btns'>
                <button className='done-btn btn-1' onClick={handleclcikdone}>Done</button>
                <button className='done-btn btn-2' onClick={handleclicktryagain}>Try again</button>
                <button className='done-btn btn-3' onClick={handleShareScore}>Share your score</button>
            </div>
        </div>
    )
}

export default Failed;
