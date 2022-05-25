/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import { StringIdGenerator } from '../../utils/AlphabetGenerator';
import TeXDisplay from '../helpers/TeXDisplay';

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
    isDisableEditTime
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

    function updateQuestion() {
        // PUT /new_question/update/:new_question_id
    }

    useEffect(() => {
        setTime(timeAnswer);
    }, [timeAnswer]);

    return (
        <>
            <hr />
            <div
                className={
                    isChoosing == id && isEdit
                        ? 'p-6 pb-4 flex justify-between bg-light-medium h-full w-full rounded-xl'
                        : 'p-6 pb-4 flex justify-between overflow-hidden'
                }
            >
                <div className="">
                    <div
                        className={
                            isSetTimeError
                                ? 'flex gap-2'
                                : 'flex gap-2 pb-3'
                        }
                    >
                        {number + 1}
                        {'.'}
                        <TeXDisplay content={questionText} />
                    </div>
                    {isSetTimeError ? (
                        <p className="text-red-600 italic text-sm pb-3">
                            * Chưa thêm thời gian cho câu hỏi (thời gian phải
                            lớn hơn 0)!!
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
                                <TeXDisplay content={answer.answer} />
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
                    {isDisableEditTime ?
                        <div
                            className="w-8 h-8 bg-gray-400 duration-200 flex justify-center items-center rounded-md"
                        // onClick={handleChooseQuestion}
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
                        :
                        isChoosing == id && isEdit ? (
                            <div
                                className="w-8 h-8 bg-green-600 hover:bg-green-700 duration-200 flex justify-center items-center hover:cursor-pointer rounded-md"
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
                                className="w-8 h-8 bg-blue-lightDark hover:bg-blue-dark duration-200 flex justify-center items-center hover:cursor-pointer rounded-md"
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

export default Question;
