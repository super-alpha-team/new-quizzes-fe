import React from 'react';
import { randomHexColor } from 'utils/helpers';


function JoiningCard({ name, ...rest }) {
    return (
        <div
            {...rest}
            className="w-64 rounded overflow-hidden shadow-lg border-[1px] border-gray-100 p-6 hover:transform hover:scale-110 hover:duration-200 text-center"
        >
            <p className='text-xl font-bold break-words' style={{ color: randomHexColor() }}>{name}</p>
        </div>
    );
}

export default JoiningCard; 
