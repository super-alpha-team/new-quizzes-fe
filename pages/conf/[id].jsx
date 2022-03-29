import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import axios from 'axios';
import parse from 'html-react-parser';
import { Base64 } from 'js-base64';
import { StringIdGenerator } from '../../utils/AlphabetGenerator';

function Question({
    id,
    isChoosing,
    setIsChoosing,
    questionText,
    answerList,
    number,
    setTimeFn,
    isSetTimeError,
    timeAnswer,
}) {
    const [isEdit, setIsEdit] = useState(false);
    const [time, setTime] = useState(timeAnswer);
    const ids = new StringIdGenerator();

    function handleChooseQuestion() {
        setIsEdit(!isEdit);
        setIsChoosing(id);
    }

    function handleSaveTime() {
        setTimeFn(id, time);
        setIsEdit(!isEdit);
        setIsChoosing(id);
    }

    function onChangeTime(e) {
        setTime(e.target.value);
    }

    return (
        <>
            <hr />
            <div
                className={
                    isChoosing == id && isEdit
                        ? 'p-6 pb-4 flex justify-between bg-light-medium h-full w-full rounded-xl'
                        : 'p-6 pb-4 flex justify-between'
                }
            >
                <div className="">
                    <div
                        className={
                            isSetTimeError
                                ? 'flex justify-between gap-2'
                                : 'flex justify-between gap-2 pb-3'
                        }
                    >
                        <p> {number + 1}. </p>
                        {parse(questionText)}
                    </div>
                    {isSetTimeError ? (
                        <p className="text-red-600 italic text-sm pb-3">
                            * Chưa thêm thời gian cho câu hỏi!!
                        </p>
                    ) : (
                        ''
                    )}
                    <div className="gap-1 flex flex-col">
                        {answerList.map((answer) => (
                            <div
                                className="flex flex-row gap-2"
                                key={answer.id}
                            >
                                <div className="w-6 h-6 bg-green-light rounded-full flex justify-center items-center">
                                    {ids.next()}
                                </div>
                                <p>{parse(answer.answer)}</p>
                            </div>
                        ))}

                        {/* <div className="flex flex-row gap-2">
                            <div className="w-6 h-6 bg-gray-light rounded-full flex justify-center items-center">A</div>
                            <p>Answer A</p>
                        </div> */}
                    </div>
                    {isChoosing == id && isEdit ? (
                        <div className="mt-4 flex gap-8">
                            <input
                                placeholder="thời gian (s)"
                                className="p-2 w-32 outline-none border border-white focus:border-gray-light transition rounded-md"
                                type="number"
                                value={time}
                                onChange={(e) => onChangeTime(e)}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div>
                    {isChoosing == id && isEdit ? (
                        <div
                            className="w-8 h-8 bg-green-600 flex justify-center items-center hover:cursor-pointer rounded-md"
                            onClick={handleSaveTime}
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
                    ) : (
                        <div
                            className="w-8 h-8 bg-blue-dark flex justify-center items-center hover:cursor-pointer rounded-md"
                            onClick={handleChooseQuestion}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function ConfigQuestion() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const router = useRouter();
    const [listQuestions, setListQuestions] = useState([]);
    const [returnListWithTime, setReturnListWithTime] = useState([]);
    const [errorConfigTimeList, setErrorConfigTimeList] = useState([]);

    function setTimeToSingleQuestion(id, time) {
        const index = returnListWithTime.findIndex(
            (question) => question.id === id
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

        // console.log(errorConfigTimeList);
        // console.log(errorCheckList);
        if (errorConfigTimeList.length == 0 && errorCheckList == 0) {
            // call edit api
            console.log('edit');
            console.log(returnListWithTime);
            const question_string = JSON.stringify(returnListWithTime);
            const question_string_encoded = Base64.encode(question_string);
            const dataSend = {
                new_quiz_id: router.query.id,
                question_string_encoded: question_string_encoded,
            };

            const response = await axios.put(`http://localhost:5000/lti/quiz/${router.query.id}/edit`, dataSend,
                { headers: { "Authorization": `Bearer ${router.query.ltik}` } });

            console.log("]> lti/quiz/edit data response", response.data);
            router.push(`/home?ltik=${router.query.ltik}`);
        }
        setErrorConfigTimeList(errorCheckList);
    }

    async function handleStartQuiz() {
        const response = await axios.post(`http://localhost:5000/lti/quiz/${router.query.id}/start`, {},
            { headers: { "Authorization": `Bearer ${router.query.ltik}` } });

        console.log("]> lti/quiz/edit data response", response.data);
        alert('Quiz started!');
    }


    function checkIfQuestionWithNoTime(id) {
        return errorConfigTimeList.includes(id);
    }

    useEffect(() => {
        const getAllQuizzes = async () => {
            const response = await axios.get(
                `http://localhost:5000/lti/quiz/${router.query.id}/get`,
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );
            const new_quiz = response.data.data.new_quiz;
            const list_question = JSON.parse(new_quiz.question);
            setListQuestions(list_question);
            setReturnListWithTime(list_question);
        };
        if (router.query.ltik) {
            getAllQuizzes();
        }
    }, [router.query.id, router.query.ltik]);

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-9/12 m-auto pt-4 pb-12">
                <div className="mt-6 text-xl p-4 border border-gray-300 w-full rounded-lg">
                    <p> Quiz title </p>
                </div>
                <p className="mb-6 mt-2">
                    * Thêm thời gian bạn muốn cho từng câu hỏi hoặc lựa chọn
                    thêm tất cả câu hỏi với cùng một thời gian
                </p>

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
                    />
                ))}

                <div
                    onClick={handleSaveQuizWithTime}
                    className="bg-blue-lightDark w-32 mr-0 ml-auto hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center"
                >
                    <p>Hoàn thành</p>
                </div>
                <p>Or</p>
                <div
                    onClick={handleStartQuiz}
                    className="bg-blue-lightDark w-32 mr-0 ml-auto hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center"
                >
                    <p>Bắt đầu game</p>
                </div>
            </div>
        </div>
    );
}

export default ConfigQuestion;
