import React from "react";
import Header from "../../components/Header";

function SingleQuiz() {
    return (
        <div className="w-9/12 h-12 mb-2 border-blue-dark border-[1px] rounded-lg m-auto flex justify-between pl-4 pr-4 items-center cursor-pointer hover:bg-[#C4CFEB] duration-300">
            <p className="">Quiz 1</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-dark"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}

function ChooseQuiz() {
    return (
        <div className="w-screen h-screen">
            <Header />

            <p className="w-9/12 m-auto mt-4 mb-4">Chon bo cau hoi</p>
            <div className="w-9/12 m-auto h-[70%] border-[#ECECEC] border-2 shadow-quiz rounded-2xl">
                <div className="flex flex-col justify-center mt-4 mb-4">
                    <SingleQuiz />
                    <div className="w-9/12 h-[200px] shadow-answer m-auto border-2 border-[#CED5DF] rounded-xl mb-5">
                        <div className="h-9 pl-4 pr-4">
                            <p className="h-full items-center flex">Answer 01</p>
                            <p className="h-full items-center flex">Answer 02</p>
                            <p className="h-full items-center flex">Answer 03</p>
                        </div>
                        
                    </div>
                    <SingleQuiz />
                    <SingleQuiz />
                    <SingleQuiz />
                </div>
            </div>
            <div className="w-9/12 m-auto justify-end flex mt-4">done</div>
        </div>
    );
}

export default ChooseQuiz;
