import { useState } from 'react';
import Button from "components/helpers/Button";
import ToggleSwitch from "components/helpers/ToggleSwitch";

import { userApi } from 'apis/userApi';
import Alert from 'components/helpers/Alert';

export default function LoginModal({ loginClickCallback, togglePopup, catchError }) {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const [isLogin, setIsLogin] = useState(true);

    function handleLogin() {
        userApi.login(loginData)
            .then(response => {
                loginClickCallback(response.data.data);
            })
            .catch(error => {
                catchError(error);
            });
    }

    async function handleRegister() {
        try {
            const response = await userApi.register(loginData);
            setLoginData({
                ...loginData,
                username: response?.data?.data?.account?.username
            });
            setIsLogin(true);
        } catch (error) {
            catchError(error);
        }
    }

    function formOnSubmit(e) {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleRegister();
        }
        togglePopup();
    }
    return <>
        <div className='relative w-max h-max min-h-[16rem] min-w-[18rem] p-4 shadow-sm shadow-qpurple-light bg-white rounded-lg flex flex-col justify-between'>
            <p className='w-max text-qpurple-dark after:block after:w-full after:h-3 after:bg-qpurple-light after:-mt-3 after:bg-opacity-60 tracking-tight font-mono text-lg font-bold py-2'>{isLogin ? "Log in" : "Register"}</p>
            <button className='absolute top-0 right-0 text-sm text-qpurple-light hover:text-qpurple p-2' onClick={togglePopup}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
            </button>
            <form className='w-full h-full flex flex-col justify-between items-center' onSubmit={formOnSubmit}>
                <p className='text-qpurple-dark self-start text-sm font-semibold py-1'>Username</p>
                <input onChange={({ target }) => setLoginData(v => ({ ...v, username: target.value }))} value={loginData.username} className='w-full py-2 px-1 outline-1 outline focus:outline-qpurple text-sm text-qpurple-dark rounded-sm placeholder:italic' type="text" placeholder='Enter username' required />
                <p className='text-qpurple-dark self-start text-sm font-semibold py-1'>Password</p>
                <input onChange={({ target }) => setLoginData(v => ({ ...v, password: target.value }))} value={loginData.password} className='w-full py-2 px-1 outline-1 outline focus:outline-qpurple text-sm text-qpurple-dark rounded-sm placeholder:italic' type="password" placeholder='Enter password' required />
                <button type='submit' className='w-full mt-4 hover:opacity-80 rounded-md bg-qpurple text-white font-semibold text-sm px-4 py-2 border-[0.05rem] border-qpurple-light'>Submit</button>
                {isLogin ? <p className='text-sm p-1 mt-2 italic'>{`Don't you have an account?`}<a className='text-qpurple-light cursor-pointer hover:text-qpurple' onClick={() => setIsLogin(false)}> Click here</a></p> : <p className='text-qpurple-light cursor-pointer text-sm mt-2 p-1 hover:text-qpurple' onClick={() => setIsLogin(true)}>Back to Login</p>}
            </form>
        </div>
    </>;
}
