import React from 'react';

function Alert({ message, isError = false }) {
    return (
        <div className='fixed z-50 top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl text-sm flex items-center px-2 py-1 gap-1 shadow-md'>
            {isError ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-qred -ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
                : <svg className="w-6 h-6 text-qgreen -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
            <p className="font-semibold">{message}</p>
        </div>
    );
}

export default Alert;