import React from 'react';
import { randomHexColor } from '../../utils/helpers';

function Loading({ message, currentIndex, gradeData }) {
    console.log('>>>', gradeData);
    let grade = gradeData?.question_index == currentIndex ? gradeData?.grade : 0;
    let isCorrect = grade > 0 ? true : false;
    return (
        <div className='w-full h-screen bg-[#2E5185] flex justify-center items-center flex-col'>
            {/* <button type="button" className="flex px-4 py-3 rounded-sm font-bold shadow-dark" style={{ backgroundColor: randomHexColor() }} disabled>
                <svg className="animate-spin mr-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                {message}
            </button> */}
            {/* <p>
                {grade != null ? `Your grade: ${grade}` : ''}
            </p> */}
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
        </div>
    );
}

export default Loading;