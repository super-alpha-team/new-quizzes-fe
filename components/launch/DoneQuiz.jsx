import React from 'react';

function DoneQuiz() {
    return (
        <div className='h-screen w-screen bg-[#46178F] font-display font-semibold flex justify-center items-center flex-col'>
            <div className="flex p-6 font-extrabold text-3xl text-white tracking-wide bg-[#230B47] shadow-dark">
                {`Sorry, this quiz is over.`}
            </div>
        </div>
    );
}

export default DoneQuiz;