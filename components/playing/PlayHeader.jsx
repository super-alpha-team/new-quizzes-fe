import SoundSetup from 'components/helpers/SoundSetup';
import React from 'react';

function PlayHeader({ currentIndex, totalQuestion, quizName }) {
    return (
        <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 py-2 px-4 w-full font-display font-semibold'>
            <div className='flex justify-between'>
                <p>{currentIndex >= 0 ? `${currentIndex + 1} of ${totalQuestion}` : ''}</p>
                <p className='rounded-full text-sm bg-qgray-light py-1 px-3 font-display min-w-[5rem] text-center w-max'>
                    {quizName}
                </p>
                <SoundSetup />
            </div>
        </div>
    );
}

export default PlayHeader;