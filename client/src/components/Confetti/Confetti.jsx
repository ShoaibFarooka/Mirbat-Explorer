import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default () => {
    const { width, height } = useWindowSize()

    const [showconfetti, setshowconfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setshowconfetti(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showconfetti && <Confetti
                width={width}
                height={height}
            />}
        </>
    )
}