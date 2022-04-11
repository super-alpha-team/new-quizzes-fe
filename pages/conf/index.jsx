import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useRouter } from 'next/router';
import SingleQuiz from '../../components/config/SingleQuiz';
import { SERVER_URL, QUIZ_STATUS } from '../../utils/config';

function ChooseQuiz() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const [listQuiz, setListQuiz] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getAllQuizzes = async () => {

            const checkNewQuiz = await axios.get(
                `${SERVER_URL}/lti/sync/lti`,
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );
            let checkNewQuizResp = checkNewQuiz.data.data;
            console.log("]> check newQuiz: ", checkNewQuizResp);

            let newQuiz = checkNewQuizResp.new_quiz;
            let newQuizInstance = checkNewQuizResp.instance;
            
            if (newQuiz) {
                // check instance Status
                // if status == active -> redirect to launcher game
                if (newQuizInstance.status === QUIZ_STATUS.PENDING || newQuizInstance.status === QUIZ_STATUS.PLAYING) {
                    // TODO
                    // router.push(`/game?instance_id=${newQuizInstanceId}`);
                }
                // else to config page
                const newQuizInstanceId =  newQuiz.new_quiz_instance_active_id;
                return router.push(`/conf/${newQuizInstanceId}?ltik=${router.query.ltik}`);
            }

            const listMooodleQuiz = await axios.get(
                `${SERVER_URL}/lti/quiz/moodle_quiz/list`,
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );
            const listMooodleQuizData = listMooodleQuiz.data.data;
            console.log("]> get list moodle quiz: ", listMooodleQuizData);

            // listMooodleQuizData
            setListQuiz(listMooodleQuizData.quiz_list);
        };
        if (router.query.ltik) {
            getAllQuizzes();
        }
    }, [router.query.ltik]);

    const goToListQuestions = async () => {
        const dataSend = {
            quiz_id: isChoosing,
            name: "test name",
            additional_info: "",
        }
        const chooseQuiz = await axios.post(`${SERVER_URL}/lti/quiz/choose`, dataSend,
            { headers: { "Authorization": `Bearer ${router.query.ltik}` } });

        const chooseQuizData = chooseQuiz.data.data;
        console.log("]> lti/quiz/choose: ", chooseQuizData);
        const dataResponse = chooseQuizData.new_quiz;
        // router.push(`/conf/${dataResponse.id}?ltik=${router.query.ltik}`);
    };

    return (
        <div className="w-screen h-screen">
            <Header />

            <p className="w-9/12 m-auto pt-4 pb-4">Chọn bộ câu hỏi</p>
            <div className="w-9/12 m-auto h-[70%] border-[#ECECEC] border-2 shadow-quiz rounded-2xl">
                <div className="h-[100%] flex flex-col pt-6 pb-4 overflow-hidden overflow-y-scroll">
                    {listQuiz.map((quizInfo) => (
                        <SingleQuiz
                            id={quizInfo.id}
                            key={quizInfo.id}
                            isChoosing={isChoosing}
                            setIsChoosing={setIsChoosing}
                            title={quizInfo.name}
                        />
                    ))}
                </div>
            </div>
            <div className="w-9/12 m-auto justify-end flex mt-4 ">
                {isChoosing != -1 ? (
                    <div
                        className="bg-blue-lightDark hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer"
                        onClick={goToListQuestions}
                    >
                        Tiếp tục
                    </div>
                ) : (
                    <div className="bg-gray-300 text-white font-bold py-2 px-4 rounded duration-300">
                        Tiếp tục
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChooseQuiz;
