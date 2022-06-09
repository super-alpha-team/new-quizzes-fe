import React from 'react';

function PlayFooter({ username, sumGrade }) {
    return (
        <div className="w-full text-lg py-4 px-4 fixed bottom-0 left-0 z-10 flex justify-between bg-white shadow-[0_0_2px_1px_rgba(0,0,0,.1)] font-display font-semibold">
            <div className="">{username}</div>
            <div className="bg-qgray-dark text-white px-8 rounded-sm">{sumGrade || 0}</div>
        </div>
    );
}

export default PlayFooter;