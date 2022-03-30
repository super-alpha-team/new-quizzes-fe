import React, { useState, useEffect, useRef } from 'react';

function Clock({ duration, handleTimeUp, currentIndex }) {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    let deadTime = new Date().getTime() / 1000 + duration;
    let currentInterval = null;

    function tick() {
        const remainedTime = Math.round(deadTime - new Date().getTime() / 1000);
        setTimeRemaining(remainedTime);
        // console.log(`currentInterval-${currentInterval}:`, duration, deadTime);
    }

    function initClock() {
        const id = setInterval(() => {
            const now = new Date().getTime() / 1000;
            if (now > deadTime) {
                handleTimeUp();
            } 
            tick();
        }, 1000);
        currentInterval = id;
    }

    useEffect(() => {
        setTimeRemaining(duration);
        initClock();
        return () => clearInterval(currentInterval);
    }, [currentIndex]);

    return (
        <>
            <div className={timeRemaining > 3 ? 'text-white font-bold flex items-center gap-2' : 'text-red-500 font-bold flex items-center gap-2'}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                {'00:' + (timeRemaining > 9 ? timeRemaining : '0' + timeRemaining)}
            </div>
        </>
    );
}

export default Clock;