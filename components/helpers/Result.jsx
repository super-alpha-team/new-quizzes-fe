import React from 'react';

function Result({currentIndex, gradeData}) {
    console.log('>>>', gradeData);
    let grade = gradeData?.question_index == currentIndex ? gradeData?.grade : 0;
    let isCorrect = grade > 0 ? true : false;

    return (
        <>
            {
                isCorrect == true && <>
                    <p className=' font-extrabold text-3xl text-white mb-5'>
                        Correct
                    </p>
                    <div className="rounded-full h-24 w-24 bg-cyan-300 flex justify-center items-center outline outline-2 outline-offset-4 outline-zinc-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <button type='button' className=' mt-10 text-2xl py-1 rounded-sm font-bold shadow-dark bg-yellow-200 px-10'>
                        + {grade}
                    </button>
                </>
            }
            {
                isCorrect == false && <>
                    <p className=' font-extrabold text-3xl text-white mb-5'>
                        Wrong
                    </p>
                    <div className="rounded-full h-24 w-24 bg-cyan-300 flex justify-center items-center outline outline-2 outline-offset-4 outline-zinc-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <button type='button' className=' mt-10 text-2xl py-1 rounded-sm font-bold shadow-dark bg-yellow-200 px-10'>
                        + {grade}
                    </button>
                </>
            }
        </>
    );
}

export default Result;