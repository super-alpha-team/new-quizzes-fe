import React from 'react';

function JoiningCard({ name, ...rest }) {
    return (
        <div
            {...rest}
            className="w-64 rounded overflow-hidden shadow-lg border-[1px] border-gray-100 p-4 hover:transform hover:scale-110 hover:duration-200 text-center"
        >
            <p>{name}</p>
        </div>
    );
}

export default JoiningCard;
