import { useState } from 'react';
import Button from "components/helpers/Button";

export default function NameModal({ nameClickCallback, closeFn, title = "Name" }) {

    const [nameData, setNameData] = useState('');

    async function formOnSubmit(e) {
        e.preventDefault();
        nameClickCallback(nameData);
        closeFn();
    }

    return (<>
        <div className='w-72 h-52 mb-32 shadow-sm shadow-qpurple-light bg-white rounded-lg relative flex justify-center'>
            <p className='text-qpurple-dark after:block after:w-full after:h-3 after:bg-qpurple-light after:-mt-3 after:bg-opacity-60 tracking-tight font-mono text-lg font-bold top-4 left-3 absolute py-2'>{title}</p>
            <button className='text-sm text-qpurple-light hover:text-qpurple p-2 top-0 right-0 absolute' onClick={closeFn}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
            </button>
            <form className='w-full flex flex-col justify-center items-center mb-4' onSubmit={formOnSubmit}>
                <p className='w-11/12 text-qpurple-dark text-sm font-semibold py-1'>Name</p>
                <input onChange={({ target }) => setNameData(target.value)} value={nameData} className='w-11/12 p-2 outline-1 outline focus:outline-qpurple text-sm text-qpurple-dark rounded-sm placeholder:italic' type="text" placeholder={`Enter ${title.toLocaleLowerCase()}`} required />
                <button type='submit' className='text-qpurple rounded-md hover:bg-qpurple hover:text-white font-semibold text-sm px-6 py-2 border-[0.05rem] border-qpurple-light bottom-4 absolute'>Create</button>
            </form>
        </div>
    </>);
}
