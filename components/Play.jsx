import React from 'react';
import { useState, useEffect } from 'react';
import Questionare from './Questionare';

function Play() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, []);

    function handleAnswer(answer) {
        // show another question
        if (currentIndex != questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        // change score if correct
        if (answer === questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }
    }

    return questions.length > 0 ?
        (<div className='h-screen w-full flex justify-center'>
            <div className='h-[85%] w-full flex justify-center relative'>
                <div className='h-[20%] w-full bg-[#2E5185] absolute top-0 flex justify-center items-center'>
                    <div className='w-9/12 flex justify-between absolute'>
                        <div className='flex gap-4'>
                            <div className='text-white font-bold flex items-center gap-3'>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                                2
                            </div>
                            <div className='text-white font-bold flex items-center gap-2'>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg>
                                {score}
                            </div>
                        </div>
                        <div>
                            <div className='text-white font-bold flex items-center gap-2'>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>                            00:07
                            </div>
                        </div>
                    </div>
                </div>
                <Questionare data={questions[currentIndex]} handleAnswer={handleAnswer} />
            </div>
        </div>)
        : (<div className='w-full h-screen bg-[#2E5185] text-white flex justify-center items-center'>Loading...</div>);
}

export default Play;
