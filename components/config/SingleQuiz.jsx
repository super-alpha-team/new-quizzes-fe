/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import useCollapse from 'react-collapsed';
import { useRouter } from 'next/router';
import TeXDisplay from '../helpers/TeXDisplay';
import quizApi from '../../apis/quizApi';

function SingleQuiz({ id, isChoosing, setIsChoosing, title, index, ...rest }) {
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
    const [quizClicked, setQuizClicked] = useState(false);
    const [listQuestions, setListQuestions] = useState([]);
    const router = useRouter();

    const handleChoosingQuiz = async () => {
        setIsChoosing(id);
        const response = await quizApi.getMoodleQuizAndQuestion(router.query.ltik, id);

        setListQuestions(response.data.data.question_data);
        setQuizClicked(!quizClicked);
        setExpanded(!isExpanded);
    };

    return (
        <>
            <div className="collapsible w-10/12 mt-2 mx-auto" {...rest}>
                <div
                    className={
                        isChoosing == id
                            ? 'h-16 mb-2 rounded-lg flex justify-between pl-4 pr-4 items-center bg-qpurple-light duration-300'
                            : 'h-14 mb-2 rounded-lg flex justify-between pl-4 pr-4 items-center hover:bg-qpurple-lighter hover:h-16 duration-300'
                    }
                    {...getToggleProps({ onClick: handleChoosingQuiz })}
                >
                    <p className={ isChoosing == id ? "text-lg text-white" : "text-lg"}>
                        {index + 1}. {title}
                    </p>
                    {isExpanded ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={isChoosing == id ? "h-6 w-6 text-white" : "h-6 w-6 "}
                            viewBox="0 0 20 20"
                            fill="currentColor"
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
                            className={isChoosing == id ? "h-6 w-6 text-white" : "h-6 w-6 "}
                            viewBox="0 0 20 20"
                            fill="currentColor"
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
                    <div className="border-2 border-[#CED5DF] rounded-xl overflow-hidden overflow-y-scroll">
                        <div className="pl-4 pr-4 h-auto ">
                            {listQuestions.map((question, index) => (
                                <div
                                    className="flex break-all h-auto pb-2 pt-1 gap-2"
                                    key={question.id}
                                >
                                    <p>{index + 1}. </p>
                                    <TeXDisplay content={question.questiontext} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </>
    );
}

export default SingleQuiz;
