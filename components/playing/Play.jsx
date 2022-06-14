/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Component } from 'react';
import Multichoice from '../questionares/Multichoice';
import Questionare from './Questionare';
import Loading from '../launch/Loading';
import Clock from './Clock';
import { socket } from '../../utils/socket';
import { useRouter } from 'next/router';
import InputUsername from '../launch/InputUsername';
import Matching from '../questionares/Matching';
import { configData } from '../../utils/configData';
import DragDrop from '../questionares/DragDrop';
import TeXDisplay from 'components/helpers/TeXDisplay';
import Result from 'components/launch/Result';
import ShortAnswer from 'components/questionares/ShortAnswer';
import FinalResult from 'components/launch/FinalResult';
import PlayHeader from './PlayHeader';
import PlayFooter from './PlayFooter';
import playApi from 'apis/playApi';

function Play({ quizId, room_id, platformUserId, username, quizName }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionData, setQuestionData] = useState(null);
    const [finish, setFinish] = useState(false);
    const [waitingMsg, setWaitingMsg] = useState('Loading...');
    const router = useRouter();
    const [grade, setGrade] = useState(null);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [rank, setRank] = useState(null);

    useEffect(() => {
        if (username) {
            let data = {
                "username": username,
                "is_teacher": false
            };
            playApi.join(router.query.ltik, quizId, data)
                .then((response) => {
                    console.log(response.data);
                    setTotalQuestion(response.data.question_count);
                    socket.emit('join', { username, room: room_id, token: response.data.alpha_token });
                    // if (response.data.current_question_data) {
                    //     setQuestionData(response.data.current_question_data);
                    //     setWaitingMsg('');
                    //     setGrade(null);
                    // }
                })
                .catch(err => console.log(err));

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
                if (data?.question_index) {
                    let gradeList = data?.grade[currentIndex];
                    if (gradeList) {
                        if (Object.entries(gradeList).length) {
                            setGrade(gradeList[platformUserId]);
                        }
                    }
                    setWaitingMsg('');
                } else {
                    setGrade(null);
                }
            });

            socket.on('rank', data => {
                setRank(data.rank_list.filter(user => user.id == platformUserId)[0]);
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
                return configData(questionData.qtype, questionData.answers);
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

    return <>
        <PlayHeader currentIndex={(finish || waitingMsg ? -1 : currentIndex)} totalQuestion={totalQuestion} quizName={quizName} />
        {finish ? <FinalResult data={rank} />
            : waitingMsg ? <Loading message={waitingMsg} />
                : <>
                    {grade != null ? <Result grade={grade} /> :
                        <div className="h-full min-h-screen w-full bg-qgray-light font-display">
                            <div className="w-full h-full min-h-screen pt-10 pb-20 flex flex-col items-center justify-between">
                                <div className="w-full h-max text-justify px-12 py-4 tracking-wider text-gray-dark leading-10 flex justify-center items-center lg:text-xl md:text-lg text-base bg-white rounded-sm shadow-[0_0_2px_1px_rgba(0,0,0,.1)] overflow-y-auto">
                                    <TeXDisplay content={questionData.questiontext} />
                                </div>
                                <div className='w-full h-full py-4 flex flex-wrap items-center'>
                                    <Clock handleTimeUp={() => handleAnswer(null)} currentIndex={currentIndex} deadTime={questionData.time_end} />
                                </div>
                                <Questionare questionType={questionData.qtype} data={config(questionData)} handleAnswer={handleAnswer} />
                            </div>
                        </div>}
                    <PlayFooter username={username} sumGrade={rank?.sum_grade} />
                </>
        }
    </>;
}

export default Play;
