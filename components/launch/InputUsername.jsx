import React, { useState } from 'react';

function InputUsername({ usernameOnSubmit }) {
    const [username, setUsername] = useState('');

    function formOnSubmit(e) {
        e.preventDefault();
        usernameOnSubmit(username);
    }

    return (
        <div className='w-full h-screen bg-[#2E5185]'>
            <form onSubmit={formOnSubmit} className='w-full h-full flex justify-center items-center'>
                <input placeholder='Enter your name...' className='w-1/4 min-w-[17rem] shadow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2 italic' onChange={({ target }) => setUsername(target.value)} />
            </form>
        </div>
    );
}

export default InputUsername;