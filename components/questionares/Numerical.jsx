import SubmitButton from 'components/helpers/SubmitButton';
import React, { useState } from 'react';

function Numerical({ handleAnswer }) {
    const [answer, setAnswer] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        handleAnswer(answer);
        setAnswer('');
    }

    return (
        <form onSubmit={onSubmit} className='w-4/5 h-full flex flex-col items-center align-middle gap-4'>
            <input type="text" value={answer} className='w-full shadow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2' onChange={({ target }) => setAnswer(target.value)} />
            <div className='self-end'>
                <SubmitButton text={'submit'} onSubmit={onSubmit} />
            </div>
        </form>
    );
}

export default Numerical;