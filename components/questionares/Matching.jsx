import React, { useState } from 'react';
import { randomHexColor } from '../../utils/helpers';

function Matching({ data }) {
    const [matches, setMatches] = useState({ left: null, right: null });

    function answerOnClick(e) {
        const { left, right } = matches;

    }

    return (
        <div className='w-full h-full grid grid-rows-3 grid-cols-2 gap-y-4 gap-x-12'>
            {data.map((value, index) =>
                <button className='w-full h-full p-1 bg-gray-400 focus:bg-red-400 border-black border-2 rounded-md text-left shadow-answer' dangerouslySetInnerHTML={{ __html: value }} onClick={answerOnClick} value={value} key={index}>
                </button>
            )}
        </div>
    );
}

export default Matching;