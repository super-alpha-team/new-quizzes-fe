/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64';
import Question from '../../components/config/Question';
import ToggleSwitch from '../../components/helpers/ToggleSwitch';
import useCollapse from 'react-collapsed';
import quizApi from '../../apis/quizApi';
import TopMenu from 'components/config/TopMenu';
import Button from 'components/helpers/Button';
import Breadcrumb from 'components/helpers/Breadcrumb';

function ConfigQuestion() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const router = useRouter();
    const [listQuestions, setListQuestions] = useState([]);
    const [returnListWithTime, setReturnListWithTime] = useState([]);
    const [errorConfigTimeList, setErrorConfigTimeList] = useState([]);
    // state newQuizInstance
    const [newQuizInstance, setNewQuizInstance] = useState({});
    const [time, setTime] = useState(10);
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    async function setTimeToSingleQuestion(id, time) {
        if (time == null) {
            return;
        }

        const index = returnListWithTime.findIndex(
            (question) => question.id === id
        );

        listQuestions[index].time_answer = time;

        let data = {
            time_answer: time
        };

        const response = await quizApi.updateQuestion(
            router.query.ltik,
            listQuestions[index].id,
            data
        );

        let newReturnList = returnListWithTime.slice();
        newReturnList[index]['time_answer'] = time;
        setReturnListWithTime(newReturnList);

        const newErrorConfigTimeList = errorConfigTimeList;
        const eIndex = newErrorConfigTimeList.indexOf(id);
        if (eIndex !== -1 && time != '') {
            newErrorConfigTimeList.splice(eIndex, 1);
            setErrorConfigTimeList(newErrorConfigTimeList);
        }
    }

    async function handleSaveQuizWithTime() {
        const errorCheckList = returnListWithTime
            .filter((question) => question.time_answer == null)
            .map((question) => question.id);

        if (errorConfigTimeList.length == 0 && errorCheckList == 0) {
            // call edit api
            const question_string = JSON.stringify(returnListWithTime);
            const question_string_encoded = Base64.encode(question_string);
            const dataSend = {
                new_quiz_id: router.query.id,
                question_string_encoded: question_string_encoded
            };

            const setInstanceActive = await quizApi.setNewInstanceActive(
                router.query.ltik,
                newQuizInstance.id
            );

            router.push({
                pathname: `/launch`,
                query: {
                    id: `${router.query.id}`,
                    ltik: `${router.query.ltik}`
                }
            });
        }
        setErrorConfigTimeList(errorCheckList);
    }

    function checkIfQuestionWithNoTime(id) {
        return errorConfigTimeList.includes(id);
    }

    useEffect(() => {
        const getQuizzData = async () => {
            try {
                const newQuizInstance =
                    await quizApi.getQuizInstanceAndQuestion(
                        router.query.ltik,
                        router.query.id
                    );

                let newQuizInstanceData = newQuizInstance.data.data;

                setNewQuizInstance(newQuizInstanceData.new_quiz_instance);

                const list_question = newQuizInstanceData.question_list;
                setListQuestions(list_question);
                setReturnListWithTime(list_question);
                // const errorTmp = list_question.filter((question) => question.time_answer == 0)
                //                                 .map((question) => question.id)
                // console.log(errorTmp);
                // setErrorConfigTimeList(errorTmp);
            } catch (err) {
                console.log('err: ', err);
            }
        };
        if (router.query.ltik) {
            getQuizzData();
        }
    }, [router.query.id, router.query.ltik]);

    function onChangeTime(e) {
        setTime(e.target.value);
    }

    async function handleSaveTimeForAllQuestion() {
        try {
            const data = {
                time_answer: time
            };
            const response = await quizApi.updateQuizInstanceTimeAllQuestion(
                router.query.ltik,
                newQuizInstance.id,
                data
            );

            setListQuestions(response.data.data.question_list);
            setReturnListWithTime(response.data.data.question_list);
            setExpanded(false);
            if (time != 0) {
                setErrorConfigTimeList([]);
            } else {
                const errorTmp = response.data.data.question_list.map(
                    (error) => error.id
                );
                setErrorConfigTimeList(errorTmp);
            }
        } catch (err) {
            console.log('err', err);
        }
    }

    function goToChooseQuizPage() {
        router.push(`/conf?ltik=${router.query.ltik}`);
    }

    // const [context, setContext] = useState({ courseName: '', quizzesName: '', action: '' });
    // useEffect(() => {
    //     syncApi.syncInfo(router.query.ltik)
    //         .then(res => {
    //             setContext({...context, quizzesName: res.data?.data?.instance?.name, courseName: res.data?.data?.context?.context?.title});
    //             console.log('sync info>>>', res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <>
            <div className="w-screen h-screen overflow-scroll overflow-x-hidden bg-background-mid">
                <div className="fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 py-2 px-4 w-full font-display font-semibold flex justify-between border-2 items-center">
                    <TopMenu goToChooseQuizPage={goToChooseQuizPage} />
                    <div onClick={handleSaveQuizWithTime}>
                        <Button
                            type="button"
                            variants="qpurple"
                            className="w-32"
                        >
                            Continue
                        </Button>
                    </div>
                </div>

                <div className=' flex items-center justify-center mt-16'>
                    <Breadcrumb token={router.query.ltik} actions={['Config time']} />
                </div>

                <div className="w-9/12 mt-2 m-auto pb-12">
                    <div className="mt-4 mb-6 text-xl p-4 border border-gray-200 bg-white w-full rounded-lg shadow-input">
                        <p>{newQuizInstance.name || 'Loading...'}</p>
                    </div>
                    <p className="mb-4 mt-2">
                        * Add time for each question or add all questions with
                        same time
                    </p>

                    <div className="flex gap-2 mb-2">
                        <ToggleSwitch
                            isToggle={isExpanded}
                            setIsToggle={setExpanded}
                        />
                        <p>Add time for all questions</p>
                    </div>

                    <div {...getCollapseProps()}>
                        <div className="flex gap-2 items-center mb-4">
                            <input
                                placeholder="thời gian (s)"
                                className="p-2 w-32 outline-none border border-gray-200 shadow-input focus:border-gray-light transition rounded-md"
                                type="number"
                                value={time}
                                onChange={(e) => onChangeTime(e)}
                            />
                            <div
                                className="w-8 h-8 bg-qgreen hover:bg-qgreen-dark duration-200 flex justify-center items-center hover:cursor-pointer rounded-md"
                                onClick={handleSaveTimeForAllQuestion}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {listQuestions.map((question, index) => (
                        <Question
                            key={question.id}
                            id={question.id}
                            isChoosing={isChoosing}
                            setIsChoosing={setIsChoosing}
                            questionText={question.questiontext}
                            number={index}
                            answerList={question.answers}
                            setTimeFn={setTimeToSingleQuestion}
                            isSetTimeError={checkIfQuestionWithNoTime(
                                question.id
                            )}
                            timeAnswer={question.time_answer}
                            isDisableEditTime={isExpanded}
                            qtype={question.qtype}
                        />
                    ))}

                    <Button
                        type="button"
                        variants="qpurple"
                        className="w-32 flex justify-center mr-0 ml-auto mt-4"
                        onClick={handleSaveQuizWithTime}
                    >
                        Continue
                    </Button>
                    {/* <div className="bg-blue-lightDark mt-4 w-32 mr-0 ml-auto hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center">
                        <p>Done</p>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ConfigQuestion;
