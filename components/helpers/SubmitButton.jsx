import React from 'react';
import { randomHexColor } from 'utils/helpers';

function SubmitButton({ text, onSubmit }) {
  return (
    <div className='min-h-[2rem] min-w-[5rem] inline-block py-1 px-4 hover:opacity-80 rounded-sm text-center shadow-dark bg-[#a8dadc]' >
      <button onClick={onSubmit}>{text}</button>
    </div>
  );
}

export default SubmitButton;