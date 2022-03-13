import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import useCollapse from "react-collapsed";
import Link from "next/link";
import axios from "axios";

function SingleQuiz({ id, isChoosing, setIsChoosing, title }) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [quizClicked, setQuizClicked] = useState(false);

    const handleExpandQuizClick = () => {
        setQuizClicked(!quizClicked);
    };

    const handleChoosingQuiz = () => {
        setIsChoosing(id);
    };

    return (
        <div className="collapsible">
            <div
                className={
                    isChoosing == id
                        ? "w-9/12 h-12 mb-2 border-blue-dark border-[1px] rounded-lg m-auto flex justify-between pl-4 pr-4 items-center bg-[#C4CFEB] duration-300"
                        : "w-9/12 h-12 mb-2 border-blue-dark border-[1px] rounded-lg m-auto flex justify-between pl-4 pr-4 items-center hover:bg-[#C4CFEB] duration-300"
                }
            >
                <p className="cursor-pointer" onClick={handleChoosingQuiz}>
                    {title}
                </p>
                {isExpanded ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-dark"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        {...getToggleProps({ onClick: handleExpandQuizClick })}
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
                        {...getToggleProps({ onClick: handleExpandQuizClick })}
                    >
                        <path
                            fillRule="evenodd"d
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
            <div {...getCollapseProps()}>
                <div className="w-9/12 h-[200px] shadow-answer m-auto border-2 border-[#CED5DF] rounded-xl mb-5 overflow-hidden overflow-y-scroll">
                    <div className="h-9 pl-4 pr-4 ">
                        <p className="h-full items-center flex">Answer 01</p>
                        <p className="h-full items-center flex">Answer 02</p>
                        <p className="h-full items-center flex">Answer 03</p>
                        <p className="h-full items-center flex">Answer 04</p>
                        <p className="h-full items-center flex">Answer 05</p>
                        <p className="h-full items-center flex">Answer 06</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChooseQuiz() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        const getAllQuizzes = async () => {
            const response = await axios.get("http://localhost:5000/lti/quiz/list", 
                { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHA6Ly8xOTIuMTY4LjEuMTMiLCJjbGllbnRJZCI6IlhPRUpTT3pXc2xPYkZsayIsImRlcGxveW1lbnRJZCI6IjIiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0Rvdkx6RTVNaTR4TmpndU1TNHhNMWhQUlVwVFQzcFhjMnhQWWtac2F6SSUzRCIsImNvbnRleHRJZCI6Imh0dHAlM0ElMkYlMkYxOTIuMTY4LjEuMTNYT0VKU096V3NsT2JGbGsyMl80IiwidXNlciI6IjIiLCJzIjoiNjdhNTgwYjc1YTUyNmJlMWEzMWM2MDAxNGE1ZmIwMzA3MTAyYmFhZmZmYTA3M2NiMDAiLCJpYXQiOjE2NDcxNjA4NjV9.h_xh_6ldZBVnlnhm02Nk5N5vH478hU8PsNESLatWwww"}});

            setListQuiz(response.data.data.quiz_list)
        }

        getAllQuizzes();
    }, [])

    console.log(listQuiz)
    
    return (
        <div className="w-screen h-screen">
            <Header />

            <p className="w-9/12 m-auto mt-4 mb-4">Chọn bộ câu hỏi</p>
            <div className="w-9/12 m-auto h-[70%] border-[#ECECEC] border-2 shadow-quiz rounded-2xl">
                <div className="h-[100%] flex flex-col pt-6 pb-4 overflow-hidden overflow-y-scroll">
                    {listQuiz.map((quizInfo) => 
                        <SingleQuiz
                            id={1}
                            key={quizInfo.id}
                            isChoosing={isChoosing}
                            setIsChoosing={setIsChoosing}
                            title={quizInfo.name}
                        />
                    )}
                    
                </div>
            </div>
            <div className="w-9/12 m-auto justify-end flex mt-4 ">
                {isChoosing != -1 ?
                    <Link href="/conf/1">
                        <div
                            className="bg-blue-lightDark hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer"
                        >
                            Button
                        </div>
                    </Link>
                    : <div
                        className=
                        "bg-gray-300 text-white font-bold py-2 px-4 rounded duration-300"
                    >
                        Tiếp tục
                    </div>
                }
            </div>
        </div>
    );
}

export default ChooseQuiz;
