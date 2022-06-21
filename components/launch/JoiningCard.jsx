import { BigHead } from '@bigheads/core';
import React from 'react';
import { randomHexColor } from 'utils/helpers';


function JoiningCard({ name, ava, ...rest }) {
    return (
        <div
            {...rest}
            className="w-64 rounded flex justify-center flex-col items-center overflow-hidden shadow-lg border-[1px] border-gray-100 pb-4 hover:transform hover:scale-110 hover:duration-200 text-center"
        >
            <div className="w-40 h-40"><BigHead {...ava} /></div>
            <p className='text-xl p-2 font-bold break-words' style={{ color: randomHexColor() }}>{name}</p>
        </div>
    );
}

export default JoiningCard; 
