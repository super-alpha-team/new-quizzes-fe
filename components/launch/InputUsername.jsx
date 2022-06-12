import React, { useState } from 'react';

function InputUsername({ usernameOnSubmit, quizName }) {
    const [username, setUsername] = useState('');

    function formOnSubmit(e) {
        e.preventDefault();
        usernameOnSubmit(username);
    }

    return (
        <div className='w-full h-screen bg-qpurple flex items-center flex-col justify-between'>
            <p className='text-white text-2xl font-display font-extrabold bg-qpurple-dark py-2 px-4 w-max h-max mt-4'>{quizName}</p>
            <form onSubmit={formOnSubmit} className='w-full h-full -mt-4 flex justify-center items-center'>
                <input placeholder='Enter your name...' className='w-1/4 min-w-[17rem] shadow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2 italic' onChange={({ target }) => setUsername(target.value)} />
            </form>
        </div>
    );
}

export default InputUsername;