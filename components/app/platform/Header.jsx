import { useRouter } from 'next/router';
import React from 'react';

function PlatformHeader() {
  const router = useRouter();
  function navigate() {
    router.push('/articles');
  }
  function navigateToApp() {
    router.push('/app');
  }

  return (
    <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 py-2 px-4 w-full font-display font-semibold'>
      <div className='flex justify-between'>
        <p className='cursor-pointer' onClick={navigate}>New Quizzes</p>
        <p className='cursor-pointer bg-qgray px-2 hover:opacity-80' onClick={navigateToApp}>Add new LTI</p>
      </div>
    </div>
  );
}

export default PlatformHeader;