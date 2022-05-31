import React from 'react';
import { randomHexColor } from 'utils/helpers';

function SubmitButton({text, onSubmit}) {
  return (
    <div className='min-h-[2rem] min-w-[5rem] inline-block mr-2 py-1 px-4 rounded-sm text-center shadow-answer' style={{backgroundColor: randomHexColor()}}>
        <button onClick={onSubmit}>{text}</button>
    </div>
  );
}

export default SubmitButton;