/* eslint-disable react/no-unescaped-entities */
import syncApi from 'apis/syncApi';
import { useState, useEffect } from 'react';

function Breadcrumb({ token, actions }) {
  const [context, setContext] = useState({ courseName: '', quizzesName: '', quizName: '' });

  useEffect(() => {
    syncApi.syncInfo(token)
      .then(res => {
        setContext({ ...context, quizName: res.data?.data?.context?.resource?.title, quizzesName: res.data?.data?.instance?.name, courseName: res.data?.data?.context?.context?.title });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='font-semibold text-sm text-left w-full px-24 pb-4 text-gray-500'> <span className=''>{context.courseName}</span> {context.quizName && <>> <span>{context.quizName}</span></>} {context.quizzesName && <>> <span>{context.quizzesName}</span></>} {actions.map((action, index) => <> > <span key={index} className={index == actions.length - 1 ? 'text-qpurple-light' : ''}>{action}</span></>)}  </div>
  );
}

export default Breadcrumb;