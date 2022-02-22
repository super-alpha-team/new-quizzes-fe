import React from 'react';
import colors from 'tailwindcss/colors';

function Questionare({ data: { question, correct_answer, incorrect_answers }, handleAnswer, questionProgress }) {
    const shuffledAnswers = shuffleArray([correct_answer, ...incorrect_answers]);
    const randomColors = shuffleArray(Array(10).fill(0).map((v, index) => `bg-random${index}`));
    const progress = questionProgress.split('/');
    const progressPercent = +progress[0] / +progress[1] * 100;

    return (
        <div className='h-[85%] lg:w-9/12 w-10/12 bg-[#91A8ED] absolute bottom-0 border-2 border-black rounded-md flex flex-col items-center justify-around'>
            <div className='w-11/12 h-[0.375rem] bg-white rounded-md'>
                <div className='h-full bg-black rounded-md' style={{ width: `${progressPercent}%` }} />
            </div>
            <div className='w-11/12 flex flex-col items-center text-justify'>
                <div className='italic uppercase font-semibold text-black text-xs'>question {questionProgress}</div>
                <div className='font-bold lg:text-lg md:text-base text-sm text-black' dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className={shuffledAnswers.length < 4 ? `w-11/12 h-1/2 grid gap-4 grid-rows-2` : `w-11/12 h-1/2 grid gap-4 grid-cols-4`}>
                {shuffledAnswers.map((answer, index) =>
                    <button className='relative' onClick={() => handleAnswer(answer)} key={index}>
                        <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm' />
                        <div className='w-full h-full p-1 absolute top-0 border-black border-2 rounded-md text-left' style={{backgroundColor: randomHexColor()}} dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                )}
            </div>
        </div>);
}

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function randomHexColor() {
    const part = () =>
        Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0');
    const r = part();
    const g = part();
    const b = part();
    return `#${r}${g}${b}`;
}

export default Questionare;
