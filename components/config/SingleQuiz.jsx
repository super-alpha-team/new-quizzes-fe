import React, { useState } from 'react';
import useCollapse from 'react-collapsed';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';

function SingleQuiz({ id, isChoosing, setIsChoosing, title }) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [quizClicked, setQuizClicked] = useState(false);
    const [listQuestions, setListQuestions] = useState([]);
    const router = useRouter();

    // const handleExpandQuizClick = async () => {
    //     const response = await axios.get(
    //         `http://localhost:5000/lti/quiz/list/${id}`,
    //         { headers: { Authorization: `Bearer ${router.query.ltik}` } }
    //     );

    //     setListQuestions(response.data.data.question_data);
    //     setQuizClicked(!quizClicked);
    // };

    const handleChoosingQuiz = async () => {
        setIsChoosing(id);
        const response = await axios.get(
            `${SERVER_URL}/lti/quiz/moodle_quiz/get/${id}`,
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

export default SingleQuiz;
