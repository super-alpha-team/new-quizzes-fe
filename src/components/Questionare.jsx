import React from 'react';

function Questionare({ data: { question, correct_answer, incorrect_answers }, handleAnswer }) {
    return (<div className='h-[85%] w-9/12 bg-[#91A8ED] absolute bottom-0 border-2 border-black rounded-md flex flex-col items-center justify-around'>
        <div className='w-11/12 h-[0.375rem] bg-white rounded-md'>
            <div className='w-[60%] h-full bg-black rounded-md'></div>
        </div>
        <div className='w-11/12 flex flex-col items-center text-justify'>
            {/* <div className='italic uppercase font-semibold text-black text-xs'>question 2/6</div> */}
            <div className='font-bold text-lg text-black'>{question}</div>
        </div>
        <div className='w-11/12 h-1/2 grid grid-cols-4 gap-4'>
            <button className='relative' onClick={() => handleAnswer(correct_answer)}>
                <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm'></div>
                <div className='w-full h-full p-1 absolute top-0 bg-[#FFC903] border-black border-2 rounded-md text-left'>{correct_answer}</div>
            </button>
            <button className='relative' onClick={() => handleAnswer(incorrect_answers[0])}>
                <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm'></div>
                <div className='w-full h-full p-1 absolute top-0 bg-[#23A093] border-black border-2 rounded-md text-left'>{incorrect_answers[0]}</div>
            </button>
            <button className='relative' onClick={() => handleAnswer(incorrect_answers[1])}>
                <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm'></div>
                <div className='w-full h-full p-1 absolute top-0 bg-[#ffffff] border-black border-2 rounded-md text-left'>{incorrect_answers[1]}</div>
            </button>
            <button className='relative' onClick={() => handleAnswer(incorrect_answers[2])}>
                <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm'></div>
                <div className='w-full h-full p-1 absolute top-0 bg-[#FF7051] border-black border-2 rounded-md text-left'>{incorrect_answers[2]}</div>
            </button>
        </div>
    </div>);
}

export default Questionare;
