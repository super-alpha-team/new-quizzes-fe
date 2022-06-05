import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import TeXDisplay from '../helpers/TeXDisplay';
import Clock from './Clock';

function Questionare({ question, children }) {
    // const { question, questionProgress } = props;
    // const progress = questionProgress.split('/');
    // let progressPercent = Math.abs(+progress[0] / +progress[1] * 100);

    return (
        // <>
        //     <div className='min-h-[80%] w-[75%] py-4 bg-[#91A8ED] absolute top-[11%] rounded-md grid justify-items-center content-around'>
        //         <div className='w-full flex flex-col items-center gap-4'>
        //             <div className='w-11/12 row-span-1 h-[0.375rem] bg-white rounded-md'>
        //                 <div className='h-full bg-[#1d3557] rounded-md' style={{ width: `${progressPercent}%` }} />
        //             </div>
        //             <div className='w-11/12 flex flex-col items-center text-justify'>
        //                 <div className='italic uppercase font-semibold text-[#1d3557] text-xs'>question {questionProgress}</div>
        //                 <div className='font-bold lg:text-base md:text-base text-xs text-[#1d3557]'>
        //                     <TeXDisplay content={question} />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className='w-11/12 row-start-2 row-end-7'>
        //             {children}
        //         </div>
        //     </div>
        // </>
        <>
            <div className="w-full h-full pt-10 pb-20 flex flex-col items-center justify-between">
                <div className="w-full max-h-min text-justify px-12 py-4 tracking-wider text-gray-dark leading-10 flex justify-center items-center lg:text-xl md:text-lg text-base bg-white rounded-sm shadow-[0_0_2px_1px_rgba(0,0,0,.1)]">
                    <TeXDisplay content={question} />
                </div>
                
                {children}
            </div>
        </>
    );
}

export default Questionare;