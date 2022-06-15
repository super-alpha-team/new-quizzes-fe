import React from 'react';

function PlayFooter({ username, sumGrade }) {
    const score = sumGrade ? parseFloat(sumGrade.toFixed(2)) : 0;
    return (
        <div className="w-full text-lg py-4 px-4 fixed bottom-0 left-0 z-10 flex justify-between bg-white shadow-[0_0_2px_1px_rgba(0,0,0,.1)] font-display font-semibold">
            <div className="">{username}</div>
            <div className="bg-qgray-dark text-white px-4 min-w-[4rem] text-center rounded-sm">{score}</div>
        </div>
    );
}

export default PlayFooter;