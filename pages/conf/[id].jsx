import React, { useState } from 'react'
import Header from '../../components/Header'

function Question({ id, isChoosing, setIsChoosing }) {
    const [isEdit, setIsEdit] = useState(false);

    function handleChooseQuestion() {
        setIsEdit(!isEdit);
    }

    return (
        <>
            {!isEdit ?
                <hr />
                : ""}
            <div className={
                isEdit
                    ? "p-6 mb-4 flex justify-between bg-light-medium h-full w-full rounded-xl"
                    : "p-6 mb-4 flex justify-between"
            }>
                <div className="">
                    <h1 className="pb-3">1. Question title</h1>
                    <div className="gap-1 flex flex-col">
                        <div className="flex flex-row gap-2">
                            <div className="w-6 h-6 bg-green-light rounded-full flex justify-center items-center">A</div>
                            <p>Answer A</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="w-6 h-6 bg-green-light rounded-full flex justify-center items-center">A</div>
                            <p>Answer A</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="w-6 h-6 bg-gray-light rounded-full flex justify-center items-center">A</div>
                            <p>Answer A</p>
                        </div>
                    </div>
                    {isEdit ?
                        <div className="mt-4 flex gap-8">
                            <input
                                placeholder="điểm"
                                className="p-2 w-32 outline-none border border-white focus:border-gray-light transition rounded-md"
                                type="number"
                            />
                            <input
                                placeholder="thời gian"
                                className="p-2 w-32 outline-none border border-white focus:border-gray-light transition rounded-md"
                                type="number"
                            />
                        </div>
                        : ""}
                </div>
                <div>
                    <div
                        className="w-8 h-8 bg-blue-dark flex justify-center items-center hover:cursor-pointer rounded-md"
                        onClick={handleChooseQuestion}
                    >
                        {!isEdit ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

function ConfigQuestion() {
    const [isChoosing, setIsChoosing] = useState(-1);
    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-9/12 m-auto">
                <div className="mt-6 mb-6 text-xl p-4 border border-gray-300 w-full rounded-lg">
                    <p> Quiz title </p>
                </div>

                <Question
                    id={1}
                    isChoosing={isChoosing}
                    setIsChoosing={setIsChoosing}
                />

                <Question
                    id={2}
                    isChoosing={isChoosing}
                    setIsChoosing={setIsChoosing}
                />
            </div>
        </div>
    )
}

export default ConfigQuestion;
