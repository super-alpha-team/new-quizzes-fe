import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Base64 } from 'js-base64';
import Question from '../../components/config/Question';
import { LOCALHOST, SERVER_URL } from '../../utils/config';
import ToggleSwitch from '../../components/helpers/ToggleSwitch';
import useCollapse from 'react-collapsed';
import quizApi from '../../apis/quizApi';
import TopMenu from 'components/config/TopMenu';

function ConfigQuestion() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const router = useRouter();
    const [listQuestions, setListQuestions] = useState([]);
    const [returnListWithTime, setReturnListWithTime] = useState([]);
    const [errorConfigTimeList, setErrorConfigTimeList] = useState([]);
    // state newQuizInstance
    const [newQuizInstance, setNewQuizInstance] = useState({});
    const [time, setTime] = useState(0);
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    async function setTimeToSingleQuestion(id, time) {
        const index = returnListWithTime.findIndex(
            (question) => question.id === id
        );

        listQuestions[index].time_answer = time;

        let data = {
            time_answer: time
        };

        const response = await quizApi.updateQuestion(router.query.ltik, listQuestions[index].id, data);

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
            .filter((question) => question.time_answer == 0)
            .map((question) => question.id);

        if (errorConfigTimeList.length == 0 && errorCheckList == 0) {
            // call edit api
            const question_string = JSON.stringify(returnListWithTime);
            const question_string_encoded = Base64.encode(question_string);
            const dataSend = {
                new_quiz_id: router.query.id,
                question_string_encoded: question_string_encoded,
            };

            const setInstanceActive = await quizApi.setNewInstanceActive(router.query.ltik, newQuizInstance.id);
            console.log('setinstance active', setInstanceActive);

            router.push({
                pathname: `/launch`,
                query: { id: `${router.query.id}`, ltik: `${router.query.ltik}` }
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
                const newQuizInstance = await quizApi.getQuizInstanceAndQuestion(router.query.ltik, router.query.id);

                let newQuizInstanceData = newQuizInstance.data.data;

                setNewQuizInstance(newQuizInstanceData.new_quiz_instance);

                const list_question = newQuizInstanceData.question_list;
                setListQuestions(list_question);
                setReturnListWithTime(list_question);
                // const errorTmp = list_question.filter((question) => question.time_answer == 0)
                //                                 .map((question) => question.id)
                // console.log(errorTmp);
                // setErrorConfigTimeList(errorTmp);
                console.log("newQuizInstance", newQuizInstance);

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
                "time_answer": time
            };
            const response = await quizApi.updateQuizInstanceTimeAllQuestion(router.query.ltik, newQuizInstance.id, data);
            console.log('response ', response);

            setListQuestions(response.data.data.question_list);
            setReturnListWithTime(response.data.data.question_list);
            setExpanded(false);
            if (time != 0) {
                setErrorConfigTimeList([]);
            } else {
                const errorTmp = response.data.data.question_list.map((error) => error.id);
                setErrorConfigTimeList(errorTmp);
            }
        } catch (err) {
            console.log('err', err);
        }

    }

    function goToChooseQuizPage() {
        router.push(`/conf?ltik=${router.query.ltik}`);
    }

    return (
        <>
            <div className="w-screen h-screen overflow-scroll overflow-x-hidden bg-background-mid">
                {/* <Header /> */}
                <div className='flex justify-start px-4 py-4'>
                    <TopMenu goToChooseQuizPage={goToChooseQuizPage} />
                </div>
                <div className="w-9/12 m-auto pt-4 pb-12">
                    <div className="mt-6 mb-6 text-xl p-4 border border-gray-200 bg-white w-full rounded-lg shadow-input">
                        <p>{newQuizInstance.name || "Quiz Untitle"}</p>
                    </div>
                    <p className="mb-4 mt-2">
                        * Thêm thời gian bạn muốn cho từng câu hỏi hoặc lựa chọn
                        thêm tất cả câu hỏi với cùng một thời gian
                    </p>

                    <div className='flex gap-2 mb-2'>
                        <ToggleSwitch isToggle={isExpanded} setIsToggle={setExpanded} />
                        <p>Thêm thời gian cho toàn bộ bài kiểm tra</p>
                    </div>

                    <div {...getCollapseProps()}>
                        <div className='flex gap-2 items-center mb-4' >
                            <input
                                placeholder="thời gian (s)"
                                className="p-2 w-32 outline-none border border-gray-200 shadow-input focus:border-gray-light transition rounded-md"
                                type="number"
                                value={time}
                                onChange={(e) => onChangeTime(e)}
                            />
                            <div
                                className="w-8 h-8 bg-green-600 hover:bg-green-700 duration-200 flex justify-center items-center hover:cursor-pointer rounded-md"
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
                            isSetTimeError={checkIfQuestionWithNoTime(question.id)}
                            timeAnswer={question.time_answer}
                            isDisableEditTime={isExpanded}
                            qtype={question.qtype}
                        />
                    ))}

                    <div
                        onClick={handleSaveQuizWithTime}
                        className="bg-blue-lightDark mt-4 w-32 mr-0 ml-auto hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center"
                    >
                        <p>Hoàn thành</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfigQuestion;
