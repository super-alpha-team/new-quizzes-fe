import React from 'react';
import { randomHexColor } from 'utils/helpers';

function SubmitButton({ text, onSubmit }) {
  return (
    <div className='min-h-[2rem] min-w-[5rem] inline-block px-4 py-2 hover:opacity-80 rounded-md text-center bg-white shadow-[0_4px_0_0_#D9D9D9]' >
      <button className='capitalize font-semibold tracking-wide' onClick={onSubmit}>{text}</button>
    </div>
  );
}

export default SubmitButton;