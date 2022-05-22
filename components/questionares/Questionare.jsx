/* eslint-disable @next/next/no-script-in-head */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Script from 'next/script';
import Head from 'next/head';
// import { MathJax } from 'mathjax-full/js/components/global';

// import {sanitize} from 'dompurify';
// import { sanitize as sannitizeLatex} from "sanitize-latex";

function Questionare(props) {
    const [isMath, setIsMath] = useState(false);
    const { question, questionProgress } = props;
    const progress = questionProgress.split('/');
    const progressPercent = +progress[0] / +progress[1] * 100;

    useEffect(() => {
        window.MathJax?.typeset();
    }, []);

    return (
        <>
            <div className='min-h-[80%] w-[75%] py-4 bg-[#91A8ED] absolute top-[11%] border-2 border-black rounded-md grid justify-items-center content-around'>
                <div className='w-full flex flex-col items-center gap-4'>
                    <div className='w-11/12 row-span-1 h-[0.375rem] bg-white rounded-md'>
                        <div className='h-full bg-black rounded-md' style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className='w-11/12 flex flex-col items-center text-justify'>
                        <div className='italic uppercase font-semibold text-black text-xs'>question {questionProgress}</div>
                        <div className='font-bold lg:text-base md:text-base text-xs text-black'>
                            {parse(question)}
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