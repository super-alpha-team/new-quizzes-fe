import React, { useState, useEffect, useRef } from 'react';

function Clock({ duration, nextQuestion, isNext, setIsNext }) {
    const interval = useRef(null);
    const [timer, setTimer] = useState('00:' + (duration > 9 ? duration : '0' + duration));
    const [deadLine, setDeadLine] = useState(duration);
    let deadTime = new Date().getUTCSeconds() + duration;

    function timeUp() {
        nextQuestion();
        const now = new Date(Date.now()).getUTCSeconds();
        
        deadTime = new Date(Date.now()).getUTCSeconds() + duration;
        console.log("time up: ", duration, now, deadTime, timer);
        if (interval.current) clearInterval(interval.current);
        // initClock();
    }

    function tick() {
        const remainedTime = deadTime - new Date().getUTCSeconds();
        setTimer('00:' + (remainedTime > 9 ? remainedTime : '0' + remainedTime));
    }

    function initClock() {
        if (interval.current) clearInterval(interval.current);
        const id = setInterval(() => {
            const now = new Date().getUTCSeconds();
            console.log(`interval-${id}:`, duration, now, deadTime, timer);
            if (now > deadTime) {
                timeUp();
                return;
            }
            tick();
        }, 1000);
        interval.current = id;
    }

    useEffect(() => {
        initClock();
    }, []);

    return (
        <>
            <div>
                <div className={`text-white font-bold flex items-center gap-2`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                    {timer}
                </div>
            </div>
        </>
    );
}

export default Clock;