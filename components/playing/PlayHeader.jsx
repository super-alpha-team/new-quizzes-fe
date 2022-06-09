import SoundSetup from 'components/helpers/SoundSetup';
import React from 'react';

function PlayHeader({ currentIndex, totalQuestion }) {
    return (
        <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 py-2 px-4 w-full font-display font-semibold'>
            <div className=' flex justify-between'>
                <p>{currentIndex + 1} of {totalQuestion}</p>
                <SoundSetup />
            </div>
        </div>
    );
}

export default PlayHeader;