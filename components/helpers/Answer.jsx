import React from 'react';
import { randomHexColor } from 'utils/helpers';

function Answer({ content }) {
    const color = content ? "rgb(58, 249, 217)" : "gray";
    return (
        <span className='min-h-[2rem] min-w-[5rem] inline-block mr-2 p-1 border-black border-2 rounded-md text-left shadow-answer cursor-grab active:cursor-grabbing' style={{ backgroundColor: color }}>
            {content}
        </span>
    );
}

export default Answer;