import React, { useRef } from 'react'
import './Pass.css'
import Confetti from '../../../../components/Confetti/Confetti'
const Pass = () => {
    const passref = useRef(null);
    return (
        <div className='pass' ref={passref} style={{ position: "relative", overflow: "hidden" }}>
            <Confetti parentRef={passref} />
            <div className='heading'>Quiz</div>
            <div className='location'>Location Name</div>
            <div className='congrats'>Congratulations
                You have completed the Quiz</div>
            <div className='your-score'>Your Score</div>
            <div className='score'>10/20</div>
            <button className='done-btn'>Done</button>

        </div>
    )
}

export default Pass
