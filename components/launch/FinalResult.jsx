import PlayFooter from 'components/playing/PlayFooter';
import React from 'react';

function FinalResult({ data }) {
    return (
        <div className="h-screen w-screen bg-[#46178F] font-display font-semibold">
            <div className="w-full h-full pt-10 pb-20 flex flex-col items-center justify-center gap-6">
                <p className='font-extrabold text-3xl text-white'>
                    Congrats!
                </p>
                <div className={"text-4xl lg:text-5xl md:text-4xl h-28 w-28 text-white font-extrabold border-4 border-qyellow-light flex justify-center items-center bg-qyellow rounded-full"}>
                    <span className='text-3xl lg:text-4xl md:text-3xl'>#</span>{data?.rank || 0}
                </div>
                <div>
                    <div className='text-lg py-2 px-12 rounded-sm font-bold bg-[#230B47] text-white'>
                        Well played.
                    </div>
                </div>
            </div>
            <PlayFooter username={data?.username} sumGrade={data?.sum_grade} />
        </div>
    );
}

export default FinalResult;