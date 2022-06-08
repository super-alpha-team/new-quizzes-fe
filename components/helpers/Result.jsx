import React, { useEffect, useState } from 'react';

// let grade = gradeData?.question_index == currentIndex ? gradeData?.grade : 0;
// let isCorrect = grade > 0 ? true : false;

function Result({ grade }) {
    const [info, setInfo] = useState({ title: '', message: '' });
    const [isPossitive, setIsPossitive] = useState(Number(grade) > 0);

    useEffect(() => {
        if (isPossitive) {
            setInfo({
                title: `Congrats`,
                message: `+ ${grade}`,
            });
        } else {
            setInfo({
                title: `Time's up`,
                message: `Great try.`,
            });
        }
    }, []);

    return (
        <>
            <div className="h-screen w-screen bg-[#46178F] font-display font-semibold">
                <div className="w-full h-full pt-10 pb-20 flex flex-col items-center justify-center gap-6">
                    <p className='font-extrabold text-3xl text-white'>
                        {info.title}
                    </p>
                    <div className={"rounded-full h-24 w-24 flex justify-center items-center border-white border-4 " + (isPossitive ? ' bg-qgreen-light' : 'bg-qred-light')}>
                        {
                            isPossitive ? <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                        }
                    </div>
                    <div>
                        {/* <div className='text-white'>1st place</div> */}
                        <div className='text-lg py-2 px-12 rounded-sm font-bold bg-[#230B47] text-white'>
                            {info.message}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Result;