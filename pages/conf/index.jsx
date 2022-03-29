import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import useCollapse from 'react-collapsed';
import axios from 'axios';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

function SingleQuiz({ id, isChoosing, setIsChoosing, title }) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [quizClicked, setQuizClicked] = useState(false);
    const [listQuestions, setListQuestions] = useState([]);
    const router = useRouter();

    const handleExpandQuizClick = async () => {
        const response = await axios.get(
            `http://localhost:5000/lti/quiz/list/${id}`,
            { headers: { Authorization: `Bearer ${router.query.ltik}` } }
        );

        setListQuestions(response.data.data.question_data);
        setQuizClicked(!quizClicked);
    };

    const handleChoosingQuiz = async () => {
        setIsChoosing(id);
        const response = await axios.get(
            `http://localhost:5000/lti/quiz/list/${id}`,
            { headers: { Authorization: `Bearer ${router.query.ltik}` } }
        );

        setListQuestions(response.data.data.question_data);
        setQuizClicked(!quizClicked);
    };

    return (
        <div className="collapsible">
            <div
                className={
                    isChoosing == id
                        ? 'w-9/12 h-12 mb-2 border-blue-dark border-[1px] rounded-lg m-auto flex justify-between pl-4 pr-4 items-center bg-[#C4CFEB] duration-300'
                        : 'w-9/12 h-12 mb-2 border-blue-dark border-[1px] rounded-lg m-auto flex justify-between pl-4 pr-4 items-center hover:bg-[#C4CFEB] duration-300'
                }
            >
                <p
                    className="cursor-pointer"
                    {...getToggleProps({ onClick: handleChoosingQuiz })}
                >
                    {title}
                </p>
                {isExpanded ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-dark"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    // {...getToggleProps({ onClick: handleExpandQuizClick })}
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-dark"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    // {...getToggleProps({ onClick: handleExpandQuizClick })}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
            <div {...getCollapseProps()}>
                <div className="w-9/12 h-[200px] shadow-answer m-auto border-2 border-[#CED5DF] rounded-xl mb-5 overflow-hidden overflow-y-scroll">
                    <div className="h-9 pl-4 pr-4 ">
                        {listQuestions.map((question, index) => (
                            <div
                                className="flex break-all h-auto pb-2 pt-1 gap-2"
                                key={question.id}
                            >
                                <p>{index + 1}. </p>
                                {parse(question.questiontext)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
