/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useState } from 'react';
import MathJax from 'react-mathjax';
import parse from 'html-react-parser';
// import MathJax

function Questionare(props) {
    const [isMath, setIsMath] = useState(false);
    const { question, questionProgress } = props;
    const progress = questionProgress.split('/');
    const progressPercent = +progress[0] / +progress[1] * 100;
    console.log(parse(question));

    return (
        <>
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
            <div className='min-h-[80%] w-[75%] py-4 bg-[#91A8ED] absolute top-[11%] border-2 border-black rounded-md grid justify-items-center content-around'>
                <div className='w-full flex flex-col items-center gap-4'>
                    <div className='w-11/12 row-span-1 h-[0.375rem] bg-white rounded-md'>
                        <div className='h-full bg-black rounded-md' style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className='w-11/12 flex flex-col items-center text-justify'>
                        <div className='italic uppercase font-semibold text-black text-xs'>question {questionProgress}</div>
                        <div className='font-bold lg:text-base md:text-base text-xs text-black'>
                            <MathJax.Provider>
                                <div>
                                    <MathJax.Node formula={<p dangerouslySetInnerHTML={{__html: `<p dir="ltr" style="text-align: left;">\\(  \\sum{a,b}  \\)<br></p>`}}></p>.innerText} />
                                </div>
                            </MathJax.Provider>
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