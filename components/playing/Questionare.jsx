import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import TeXDisplay from '../helpers/TeXDisplay';

function Questionare(props) {
    const [isMath, setIsMath] = useState(false);
    const { question, questionProgress } = props;
    const progress = questionProgress.split('/');
    let progressPercent = Math.abs(+progress[0] / +progress[1] * 100);

    return (
        <>
            <div className='min-h-[80%] w-[75%] py-4 bg-[#91A8ED] absolute top-[11%] rounded-md grid justify-items-center content-around'>
                <div className='w-full flex flex-col items-center gap-4'>
                    <div className='w-11/12 row-span-1 h-[0.375rem] bg-white rounded-md'>
                        <div className='h-full bg-black rounded-md' style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className='w-11/12 flex flex-col items-center text-justify'>
                        <div className='italic uppercase font-semibold text-black text-xs'>question {questionProgress}</div>
                        <div className='font-bold lg:text-base md:text-base text-xs text-black'>
                            <TeXDisplay content={question} />
                        </div>
                    </div>
                </div>
                <div className='w-11/12 row-start-2 row-end-7'>
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default Questionare;