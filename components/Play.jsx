import { useState, useEffect } from 'react';
import Clock from './Clock';
import Multichoice from './questionares/Multichoice';
import Questionare from './questionares/Questionare';

import { io } from 'socket.io-client';
import { randomHexColor } from '../utils/helpers';

function Play({ total_questions, room_id }) {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [finish, setFinish] = useState(false);
    const [waiting, setWaiting] = useState(true);

    // useEffect(() => {
    //     fetch('https://opentdb.com/api.php?amount=10')
    //         .then(res => res.json())
    //         .then(data => setQuestions(data.results));
    // }, []);

    useEffect(() => {
        const socket = io('ws://localhost:5000');

        socket.on('connect', () => {
            socket.emit('join', { username: 'chloe', room: room_id });
        });

        socket.on('data', data => {
            console.log(']> socket data: ', data);
        });

        socket.on('question', data => {
            console.log('question data', data);
            const { current_question_index, question } = data;

            if (current_question_index < 0) {
                setFinish(true);
            } else {
                setFinish(false);
                setWaiting(false);
                const { questiontext, answers, time_answer } = question;
                setCurrentIndex(current_question_index);
                setTimeRemaining(Number(time_answer));
                setQuestion(questiontext);
                setAnswers(answers);
            }
        });

        // socket.emit('send', { room: socket.id, new_quiz_id: 'bla', idtoken_id: 'bla', answer_log_data: 'bla' });

        return () => socket.disconnect();
    }, []);

    function handleAnswer(answer) {
        // if (currentIndex != questions.length - 1) {
        //     setCurrentIndex(currentIndex + 1);
        // }
        // if (answer === questions[currentIndex].correct_answer) {
        //     setScore(score + 1);
        // }
        setWaiting(true);
    }

    return finish ?
        (<div className='w-full h-screen bg-[#2E5185] text-white flex justify-center items-center'>Your score: {score}</div>)
        : !waiting ?
            (<div className='block h-screen overflow-auto'>
                <div className='min-h-screen h-full min-w-screen flex justify-center md:text-sm text-xs lg:text-base overflow-hidden'>
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
                                <Clock duration={timeRemaining} handleTimeUp={() => { }} currentIndex={currentIndex} />
                            </div>
                        </div>
                        <Questionare question={question} questionProgress={`${currentIndex + 1}/${total_questions}`}>
                            <Multichoice answers={answers} handleAnswer={handleAnswer} />
                        </Questionare>
                    </div>
                </div>
            </div>)
            : (<div className='w-full h-screen bg-[#2E5185] flex justify-center items-center'>
                <button type="button" className="flex px-4 py-3 rounded-sm font-bold shadow-answer" style={{ backgroundColor: randomHexColor() }} disabled>
                    <svg className="animate-spin mr-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                    Loading...
                </button>
            </div>);
}

export default Play;
