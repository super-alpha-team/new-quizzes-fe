import React, { useState, useEffect, useRef } from 'react';
import { convertTimer, convertToMinutes } from '../../utils/helpers';

function Clock({ handleTimeUp, currentIndex, deadTime }) {
    const [timeRemaining, setTimeRemaining] = useState(Math.round((deadTime - new Date().getTime()) / 1000));
    let currentInterval = null;

    function tick() {
        const remainedTime = Math.round((deadTime - new Date().getTime()) / 1000);
        setTimeRemaining(remainedTime);
    }

    function initClock() {
        const id = setInterval(() => {
            const now = new Date().getTime();
            if (now > deadTime) {
                handleTimeUp();
            }
            tick();
        }, 1000);
        currentInterval = id;
    }

    useEffect(() => {
        setTimeRemaining(Math.round((deadTime - new Date().getTime()) / 1000));
        initClock();
        return () => clearInterval(currentInterval);
    }, [currentIndex]);

    return (
        <div className={"w-20 h-20 ml-4 flex justify-center items-center rounded-[50%] text-lg bg-qpurple-light text-white font-semibold" + (timeRemaining <= 10 ? " bg-qred" :"")}>{convertToMinutes(timeRemaining)}</div>
    );
}

export default Clock;

