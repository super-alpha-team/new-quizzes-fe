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
        <>
            {/* <div className={'text-white font-bold flex items-center gap-2 ' + (timeRemaining > 10 ? '' : 'text-red-500')}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                {convertTimer(timeRemaining)}
            </div> */}
            <div className="w-20 h-20 ml-4 flex justify-center items-center rounded-[50%] text-lg bg-qpurple text-white ">{convertToMinutes(timeRemaining)}</div>
        </>
    );
}

export default Clock;

