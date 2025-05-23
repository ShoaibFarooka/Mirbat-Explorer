import React, { useRef } from 'react'
import './Pass.css'
import Confetti from '../../../../../components/Confetti/Confetti';
import { message } from 'antd';

const Pass = ({ score, setScore, setIsFinished, setIsOpen, name, totalQuestions }) => {

    const passref = useRef(null);

    const handleClickDone = () => {
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
        <div className='pass' ref={passref} style={{ position: "relative", overflow: "hidden" }}>
            <Confetti parentRef={passref} />
            <div className='heading'>Quiz</div>
            <div className='location'>{name}</div>
            <div className='congrats'>Congratulations
                You have completed the Quiz</div>
            <div className='your-score'>Your Score</div>
            <div className='score'>{`${score}/${totalQuestions}`}</div>
            <div className='btns'>
                <button className='done-btn' onClick={handleClickDone}>Done</button>
                <button className='done-btn' onClick={handleShareScore}>Share your score</button>
            </div>
        </div>


    )
}

export default Pass;
