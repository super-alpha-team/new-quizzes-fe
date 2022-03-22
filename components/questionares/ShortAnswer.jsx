import React from 'react';

function ShortAnswer({ handleAnswer }) {
    return (
        <div className='w-full h-full flex items-center'>
            <input type="text" className='w-full shadow-answer border-black border-2 rounded-md h-10 focus:outline-none p-2' />
        </div>
    );
}

export default ShortAnswer;