import React from 'react';
import colors from 'tailwindcss/colors';

function Questionare({ data: { question, correct_answer, incorrect_answers }, handleAnswer, randomColors }) {
    const shuffledAnswers = shuffleArray([correct_answer, ...incorrect_answers]);
    const t = [`bg-random0`, `bg-random1`, `bg-random2`, `bg-random3`, `bg-random4`]

    return (<div className='h-[85%] lg:w-9/12 w-10/12 bg-[#91A8ED] absolute bottom-0 border-2 border-black rounded-md flex flex-col items-center justify-around'>
        <div className='w-11/12 h-[0.375rem] bg-white rounded-md'>
            <div className='w-[60%] h-full bg-black rounded-md'></div>
        </div>
        <div className='w-11/12 flex flex-col items-center text-justify'>
            {/* <div className='italic uppercase font-semibold text-black text-xs'>question 2/6</div> */}
            <div className='font-bold lg:text-lg md:text-base text-sm text-black'>{question}</div>
        </div>
        <div className={shuffledAnswers.length < 4 ? `w-11/12 h-1/2 grid gap-4 grid-rows-2` : `w-11/12 h-1/2 grid gap-4 grid-cols-4`}>
            {shuffledAnswers.map((answer, index) =>
                <button className='relative' onClick={() => handleAnswer(answer)} key={index}>
                    <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm'></div>
                    <div className={`w-full h-full p-1 absolute top-0 border-black border-2 rounded-md text-left ${t[index]}`}>{answer}</div>
                </button>
            )}
        </div>
    </div>);
}

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

export default Questionare;
