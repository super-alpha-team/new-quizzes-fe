import React from 'react';
import TeXDisplay from './TeXDisplay';

function Answer({ content, color }) {
    return (
        <span className={'min-h-[2rem] min-w-[5rem] inline-block mr-2 mt-2 py-1 px-2 rounded-md text-left shadow-light'} style={{ backgroundColor: color }}>
            {content}
        </span>
        // <button className='w-full h-full max-h-64' onClick={() => handleAnswer(Number(answer.id))}>
        //     <div className='w-full h-full p-2 rounded-md text-left shadow-light text-white hover:opacity-80' style={{ backgroundColor: randomHexColor() }} >
        //         <TeXDisplay content={content} />
        //     </div>
        // </button>
    );
}

export default Answer;