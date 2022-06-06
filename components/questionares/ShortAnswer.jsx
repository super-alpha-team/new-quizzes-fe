import SubmitButton from 'components/helpers/SubmitButton';
import React, { useState } from 'react';

function ShortAnswer({ handleAnswer }) {
    const [answer, setAnswer] = useState('');
    return (
        <div className='w-4/5 h-full flex flex-col items-center gap-4'>
            <input type="text" className='w-full shadow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2' onChange={({ target }) => setAnswer(target.value)} />
            <div className='self-end'>
                <SubmitButton text={'submit'} onSubmit={() => handleAnswer(answer)} />
            </div>
        </div>
    );
}

export default ShortAnswer;