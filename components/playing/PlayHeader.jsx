import React from 'react';

function PlayHeader({ currentIndex, totalQuestion }) {
    return (
        <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 p-2 w-full font-display font-semibold'>{currentIndex + 1} of {totalQuestion}</div>
    );
}

export default PlayHeader;