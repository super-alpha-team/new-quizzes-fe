import React from 'react';

function Questionare(props) {
    const { question, questionProgress } = props;
    const progress = questionProgress.split('/');
    const progressPercent = +progress[0] / +progress[1] * 100;

    return (
        <div className='h-[75%] w-[75%] bg-[#91A8ED] absolute bottom-[11%] border-2 border-black rounded-md grid justify-items-center content-around'>
            <div className='w-11/12 row-span-1 h-[0.375rem] bg-white rounded-md'>
                <div className='h-full bg-black rounded-md' style={{ width: `${progressPercent}%` }} />
            </div>
            <div className='w-11/12 row-start-2 row-end-3 flex flex-col items-center text-justify'>
                <div className='italic uppercase font-semibold text-black text-xs'>question {questionProgress}</div>
                <div className='font-bold lg:text-lg md:text-base text-sm text-black' dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className='w-11/12 row-start-3 row-end-7'>
                {props.children}
            </div>
        </div>
    );
}

export default Questionare;