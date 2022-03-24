import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from "next/router"
import axios from "axios"
import parse from 'html-react-parser'

function Question({ id, isChoosing, setIsChoosing, questionText, answerList, number }) {
    const [isEdit, setIsEdit] = useState(false);

    function handleChooseQuestion() {
        setIsEdit(!isEdit);
        setIsChoosing(id);
    }

    return (
        <>
            {isChoosing != id && !isEdit ?
                <hr />
                : ""}
            <div className={
                isChoosing == id && isEdit
                    ? "p-6 mb-4 flex justify-between bg-light-medium h-full w-full rounded-xl"
                    : "p-6 mb-4 flex justify-between"
            }>
                <div className="">
                    {/* <h1 className="mb-4" >{number + 1}. {questionText}</h1> */}
                    <div className="flex justify-between gap-2 mb-3">
                        <p> {number + 1}. </p>
                        {parse(questionText)}
                    </div>
                    <div className="gap-1 flex flex-col">
                        {answerList.map((answer) => 
                            <div className="flex flex-row gap-2">
                                <div className="w-6 h-6 bg-green-light rounded-full flex justify-center items-center">A</div>
                                <p >{parse(answer.answer)}</p>
                            </div>
                        )}        

                        {/* <div className="flex flex-row gap-2">
                            <div className="w-6 h-6 bg-gray-light rounded-full flex justify-center items-center">A</div>
                            <p>Answer A</p>
                        </div> */}
                    </div>
                    {isChoosing == id && isEdit ?
                        <div className="mt-4 flex gap-8">
                            <input
                                placeholder="thời gian"
                                className="p-2 w-32 outline-none border border-white focus:border-gray-light transition rounded-md"
                                type="number"
                            />
                        </div>
                        : ""}
                </div>
                <div>

                    {isChoosing == id && isEdit ?
                        <div
                            className="w-8 h-8 bg-green-600 flex justify-center items-center hover:cursor-pointer rounded-md"
                            onClick={handleChooseQuestion}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        :

                        <div
                            className="w-8 h-8 bg-blue-dark flex justify-center items-center hover:cursor-pointer rounded-md"
                            onClick={handleChooseQuestion}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

function ConfigQuestion() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const router = useRouter();
    const [listQuestions, setListQuestions] = useState([])
    
    console.log(listQuestions)

    useEffect(() => {
        const getAllQuizzes = async () => {
            const response = await axios.get(`http://localhost:5000/lti/quiz/list/${router.query.id}`, 
                { headers: { "Authorization": `Bearer ${router.query.ltik}`}});

            setListQuestions(response.data.data.question_data)
            console.log(response.data.data)
        } 
        if(router.query.ltik){
            getAllQuizzes()
        }
        
    }, [router.query.ltik])

    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-9/12 m-auto pt-20 pb-12">
                <div className="mt-6 mb-6 text-xl p-4 border border-gray-300 w-full rounded-lg">
                    <p> Quiz title </p>
                </div>

                {listQuestions.map((question, index) => 
                    <Question
                        key={question.id}
                        id={question.id}
                        isChoosing={isChoosing}
                        setIsChoosing={setIsChoosing}
                        questionText={question.questiontext}
                        number={index}
                        answerList={question.answers}
                    />
                )}
                


                <div
                    className=
                    "bg-blue-lightDark w-24 mr-0 ml-auto hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer"
                >
                    <p>Tiếp tục</p>
                </div>
            </div>
        </div>
    )
}

export default ConfigQuestion;
