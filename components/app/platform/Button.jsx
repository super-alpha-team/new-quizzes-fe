import React from 'react';

function Button({ children, onSubmit }) {
    return (
        <button
            onClick={onSubmit}
            className="min-h-[2rem] min-w-[5rem] inline-block p-1 hover:opacity-80 rounded-sm text-center bg-qgreen text-white shadow-[0_3px_0_0_#106b03] capitalize font-semibold"
        >
            {children}
        </button>
    );
}

export default Button;
