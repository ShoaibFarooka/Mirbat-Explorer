import React, { useRef } from 'react'
import './Pass.css'
import Confetti from '../../../../../components/Confetti/Confetti'
const Pass = ({ score, setscore, setisfinished, setisOpen, name, totalQuestions }) => {
    const passref = useRef(null);
    const handleclickdone = () => {
        setisfinished(false);
        setscore(0);
        setisOpen(false);
    }
    return (
        <div className='pass' ref={passref} style={{ position: "relative", overflow: "hidden" }}>
            <Confetti parentRef={passref} />
            <div className='heading'>Quiz</div>
            <div className='location'>{name}</div>
            <div className='congrats'>Congratulations
                You have completed the Quiz</div>
            <div className='your-score'>Your Score</div>
            <div className='score'>{`${score}/${totalQuestions}`}</div>
            <button className='done-btn' onClick={handleclickdone}>Done</button>

        </div>
    )
}

export default Pass
