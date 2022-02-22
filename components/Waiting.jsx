/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function Waiting({ startOnClick }) {
    return (
        <div className='w-full h-screen bg-[#2E5185] flex justify-center items-center'>
            <button className='relative w-32 h-12' onClick={startOnClick} >
                <div className='w-full h-full bg-black absolute top-1 left-1 text-justify text-sm rounded-sm'></div>
                <div className='w-full h-full p-1 absolute top-0 border-black border-2 text-center flex justify-center items-center bg-orange-500 hover:bg-lime-500 text-black rounded-sm'>Let's go!</div>
            </button>
        </div>
    );
}

export default Waiting;