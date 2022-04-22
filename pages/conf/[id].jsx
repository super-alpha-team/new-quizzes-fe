import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Base64 } from 'js-base64';
import Question from '../../components/config/Question';
import { SERVER_URL } from '../../utils/config';

function ConfigQuestion() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const router = useRouter();
    const [listQuestions, setListQuestions] = useState([]);
    const [returnListWithTime, setReturnListWithTime] = useState([]);
    const [errorConfigTimeList, setErrorConfigTimeList] = useState([]);
    // state newQuizInstance
    const [newQuizInstance, setNewQuizInstance] = useState({});

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

            // const response = await axios.put(`http://localhost:5000/lti/quiz/${router.query.id}/edit`, dataSend,
            //     { headers: { "Authorization": `Bearer ${router.query.ltik}` } });

            router.push({
                pathname: `/launch`,
                query: {id: `${router.query.id}`, ltik: `${router.query.ltik}`}
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
                const newQuizInstance = await axios.get(
                    `${SERVER_URL}/lti/quiz/new_quiz_instance/get_and_question_list/${router.query.id}`,
                    { headers: { Authorization: `Bearer ${router.query.ltik}` } }
                );
                let newQuizInstanceData = newQuizInstance.data.data;
                console.log("config | useEffect[], new_quiz_instance", newQuizInstanceData);

                setNewQuizInstance(newQuizInstanceData.new_quiz_instance)
                
                const list_question = newQuizInstanceData.question_list;
                setListQuestions(list_question);
                setReturnListWithTime(list_question);
            } catch (err) {
                console.log('err: ', err);
            }
        };
        if (router.query.ltik) {
            getQuizzData();
        }
    }, [router.query.id, router.query.ltik]);

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-9/12 m-auto pt-4 pb-12">
                <div className="mt-6 text-xl p-4 border border-gray-300 w-full rounded-lg">
                    <p>{newQuizInstance.name || "Quiz Untitle"}</p>
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
            </div>
        </div>
    );
}

export default ConfigQuestion;
