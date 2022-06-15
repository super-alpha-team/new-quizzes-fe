import { useState } from 'react';
import Button from "components/helpers/Button";
import ToggleSwitch from "components/helpers/ToggleSwitch";

import { userApi } from 'apis/userApi';
import Alert from 'components/helpers/Alert';

export default function LoginModal({ loginClickCallback, closeFn }) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const [isLogin, setIsLogin] = useState(true);
    const [noti, setNoti] = useState({ msg: '', isError: false });

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await userApi.login(loginData);
            loginClickCallback(response.data.data);
            closeFn();
        } catch (error) {
            if (error.response) {
                alertError(error.response.data?.message);
            } else {
                alertError(error.message);
            }
        }
    }

    function alertMessage(msg) {
        setNoti({ ...noti, msg });
        setTimeout(() => setNoti({ msg: '', isError: false }), 3000);
    }

    function alertError(msg) {
        setNoti({ isError: true, msg });
        setTimeout(() => setNoti({ msg: '', isError: false }), 3000);
    }
    async function handleRegister(e) {
        e.preventDefault();
        try {
            const response = await userApi.register(loginData);
            console.log('handleRegister>>>', response);
            setLoginData({
                ...loginData,
                username: response?.data?.data?.account?.username
            });
            setIsLogin(true);
        } catch (error) {
            if (error.response) {
                alertError(error.response.data?.message);
            } else {
                alertError(error.message);
            }
        }
    }

    return <>
        {noti.msg && <Alert message={noti.msg} isError={noti.isError} />}

        <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
            >
                <div className="flex flex-row justify-between">
                    <p className="text-xl font-bold mb-1">
                        {isLogin ? "Login" : "Register"} account
                    </p>
                    <ToggleSwitch isToggle={isLogin} setIsToggle={setIsLogin} />
                </div>
                <hr />
                <div className="flex flex-col gap-4 mt-6">
                    <div className="flex justify-between items-start flex-col">
                        <p>Tên đăng nhập</p>
                        <input
                            type={'text'}
                            placeholder='Enter your name...'
                            className='w-1/4 min-w-[17rem] shalow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2 italic'
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                    </div>
                    <div className="flex justify-between items-start flex-col">
                        <p>Mật khẩu</p>
                        <input
                            type="password"
                            placeholder='Enter your password...'
                            className='w-1/4 min-w-[17rem] shalow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2 italic'
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                    </div>
                </div>
                <div className="flex gap-2 mt-8 justify-end">
                    <Button
                        type="button"
                        variants="secondary"
                        onClick={closeFn}
                    >
                        Hủy
                    </Button>
                    {
                        isLogin ? <Button
                            type="button"
                            variants="primary"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                            : <Button
                                type="button"
                                variants="primary"
                                onClick={handleRegister}
                            >
                                Đăng ký
                            </Button>
                    }
                </div>
            </form>
        </div>
    </>;
}
