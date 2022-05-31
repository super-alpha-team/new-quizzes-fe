import React from 'react';

function Answer({ content, color }) {
    return (
        <span className={'min-h-[2rem] min-w-[5rem] inline-block mr-2 mt-2 py-1 px-2 rounded-md text-left shadow-answer'} style={{ backgroundColor: color }}>
            {content}
        </span>
    );
}

export default Answer;