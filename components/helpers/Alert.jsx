import React from 'react';

function Alert({ message }) {
    return (
        <div className='absolute z-50 top-10 bg-white rounded-2xl text-sm flex items-center px-2 py-1 gap-1 shadow-md'>
            <svg className="w-6 h-6 text-green-500 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            {message}
        </div>
    );
}

export default Alert;