/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Component } from 'react';
import Multichoice from '../questionares/Multichoice';
import Questionare from './Questionare';
import Loading from '../helpers/Loading';
import Clock from './Clock';
import { socket } from '../../utils/socket';
import axios from 'axios';
import { useRouter } from 'next/router';
import InputUsername from '../launch/InputUsername';
import Matching from '../questionares/Matching';
import { configData } from '../../utils/configData';
import DragDrop from '../questionares/DragDrop';
import { LOCALHOST } from 'utils/config';
import TeXDisplay from 'components/helpers/TeXDisplay';
import Result from 'components/helpers/Result';
import ShortAnswer from 'components/questionares/ShortAnswer';
import FinalResult from 'components/helpers/FinalResult';

function Play({ quizId, room_id, platformUserId, username }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionData, setQuestionData] = useState(null);
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const [waitingMsg, setWaitingMsg] = useState('Loading...');
    const router = useRouter();
    const [grade, setGrade] = useState(null);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [showGrade, setShowGrade] = useState(false);

    useEffect(() => {
        if (username) {
            axios.post(`${LOCALHOST}/lti/play/${quizId}/join`, {
                "username": username,
                "is_teacher": false
            },
                { headers: { Authorization: `Bearer ${router.query.ltik}` } })
                .then((response) => {
                    setTotalQuestion(response.data.question_count);
                    socket.emit('join', { username, room: room_id, token: response.data.alpha_token });
                    if (response.data.current_question_data) {
                        setQuestionData(response.data.current_question_data);
                        setWaitingMsg('');
                        setGrade(null);
                    }
                });
            socket.on('question', data => {
                const { current_question_index, question } = data;
                setCurrentIndex(current_question_index);
                if (current_question_index < 0) {
                    setFinish(true);
                } else {
                    setFinish(false);
                    setQuestionData(question);
                    setWaitingMsg('');
                    setGrade(null);
                }
            });

            socket.on('grade_student', data => {
                console.log('grade >>> ', data);
                setGrade(data?.question_index == currentIndex ? data?.grade : 0);
            });

            socket.on('rank', data => {
                console.log('rank >>> ', data);
                setScore(data.rank_list.filter(user => user.id == platformUserId)[0].sum_grade);
            });

            return () => socket.disconnect();
        }
    }, [username]);

    function handleAnswer(answer) {
        let answer_log_data = {
            time_answer: Date.now(),
        };

        switch (questionData.qtype) {
            case 'choice':
            case 'true/false':
                answer_log_data.answer_id = answer ? answer : -1;
                break;

            case 'matching':
            case 'draganddrop':
                answer_log_data.answer = answer;
                break;

            case 'shortanswer':
                answer_log_data.answer_text = answer;
                break;

            case 'numerical':
                answer_log_data.answer_number = Number(answer);
                break;
        }

        socket.emit('send', { current_question_index: currentIndex, answer_log_data });

        setWaitingMsg(`Great! Let's wait for your mates`);
    }

    function config(questionData) {
        switch (questionData.qtype) {
            case 'choice':
            case 'true/false':
                return questionData.answers;
                break;

            case 'matching':
            case 'draganddrop':
                return configData(questionData.qtype, JSON.parse(questionData.additional_info));
                break;

            case 'shortanswer':
            case 'numerical':
                return null;
                break;

            default:
                return null;
                break;
        }
    }

    return finish ? <FinalResult />
        // : showGrade ? <Result grade={grade} />
            : waitingMsg ? <Loading message={waitingMsg} />
                : (
                    <div className="h-screen w-screen bg-qgray-light font-display font-semibold">
                        <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 p-2 w-full'>{currentIndex + 1} of {totalQuestion}</div>
                        <div className="w-full h-full pt-10 pb-20 flex flex-col items-center justify-between">
                            <div className="w-full max-h-min text-justify px-12 py-4 tracking-wider text-gray-dark leading-10 flex justify-center items-center lg:text-xl md:text-lg text-base bg-white rounded-sm shadow-[0_0_2px_1px_rgba(0,0,0,.1)]">
                                <TeXDisplay content={questionData.questiontext} />
                            </div>
                            <div className='w-full h-full py-4 grid grid-cols-3 items-center justify-center'>
                                <Clock handleTimeUp={() => handleAnswer(null)} currentIndex={currentIndex} deadTime={questionData.time_end} />
                            </div>
                            <Questionare questionType={questionData.qtype} data={config(questionData)} handleAnswer={handleAnswer} />
                        </div>
                        <div className="w-full text-lg py-4 px-4 fixed bottom-0 left-0 z-10 flex justify-between bg-white shadow-[0_0_2px_1px_rgba(0,0,0,.1)]">
                            <div className="">{username}</div>
                            <div className="bg-qgray-dark text-white px-8 rounded-sm">{score}</div>
                        </div>
                    </div>
                );

}

export default Play;
