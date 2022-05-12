import { useState, useEffect, Component } from 'react';
import Multichoice from './questionares/Multichoice';
import Questionare from './questionares/Questionare';
import Loading from './helpers/Loading';
import Clock from './Clock';
import { socket } from '../utils/socket';
import axios from 'axios';
import { useRouter } from 'next/router';
// import { BE_URL } from '../utils/config';

function Play({ total_questions, quizId, room_id }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionData, setQuestionData] = useState(null);
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const [waitingMsg, setWaitingMsg] = useState('Loading...');
    const router = useRouter();

    useEffect(() => {
        axios.post(`http://localhost:5000/lti/play/${quizId}/join`, {
            "username": "chloe",
            "is_teacher": false
        },
            { headers: { Authorization: `Bearer ${router.query.ltik}` } })
            .then((response) => {
                console.log(response);

                console.log('play screen');
                socket.emit('join', { username: 'chloe', room: room_id, token: response.data.alpha_token });
            });
        socket.on('question', data => {
            const { current_question_index, question } = data;
            setCurrentIndex(current_question_index);
            console.log(data);
            if (current_question_index < 0) {
                setFinish(true);
            } else {
                setFinish(false);
                setQuestionData(question);
                console.log('question', question);
                setWaitingMsg('');
            }
        });

        return () => socket.disconnect();
    }, []);

    function handleAnswer(answer) {
        console.log(answer);
        let answer_log_data = { answer_id: answer };
        if (answer == null) {
            answer_log_data.answer_id = -1;
        }
        socket.emit('send', { current_question_index: currentIndex, answer_log_data });

        setWaitingMsg('Great! Let\'s wait for your mates');
    }

    return finish ?
        (<div className='w-full h-screen bg-[#2E5185] text-white flex justify-center items-center'>Your score: {score}</div>)
        : waitingMsg ?
            <Loading message={waitingMsg} /> :
            (<div className='h-screen'>
                <div className='min-h-screen h-full min-w-screen flex justify-center md:text-sm text-xs lg:text-base'>
                    <div className='h-full w-full flex justify-center relative'>
                        <div className='h-[15%] w-full bg-[#2E5185] absolute top-0 flex justify-center items-center'>
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
                                <Clock duration={Number(questionData.time_answer)} handleTimeUp={() => handleAnswer(null)} currentIndex={currentIndex} />
                            </div>
                        </div>
                        <Questionare question={questionData.questiontext} questionProgress={`${currentIndex + 1}/${total_questions}`}>
                            <Multichoice answers={questionData.answers} handleAnswer={handleAnswer} />
                        </Questionare>
                    </div>
                </div>
            </div>);

}

export default Play;
