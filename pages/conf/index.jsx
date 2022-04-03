import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useRouter } from 'next/router';
import SingleQuiz from '../../components/config/SingleQuiz';

function ChooseQuiz() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const [listQuiz, setListQuiz] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getAllQuizzes = async () => {
            const response = await axios.get(
                'http://localhost:5000/lti/quiz/list',
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );
            
            console.log("]> get list quiz: ", response.data.data);
            const data = response.data.data;
            if (data.isQuiz) {
                const quiz_id = data.isQuiz.id;
                return router.push(`/conf/${quiz_id}?ltik=${router.query.ltik}`);
            }

            setListQuiz(response.data.data.quiz_list);
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
        const response = await axios.post("http://localhost:5000/lti/quiz/add", dataSend,
            { headers: { "Authorization": `Bearer ${router.query.ltik}` } });

        console.log("]> lti/quiz/add data response", response.data);
        const dataResponse = response.data.data.new_quiz;
        router.push(`/conf/${dataResponse.id}?ltik=${router.query.ltik}`);
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
