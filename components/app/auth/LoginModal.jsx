import { useState } from 'react';
import Button from "components/helpers/Button";
import ToggleSwitch from "components/helpers/ToggleSwitch";

import { userApi } from 'apis/userApi';

export default function LoginModal({ loginClickCallback, closeFn }) {

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const [isLogin, setIsLogin] = useState(true);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await userApi.login(loginData);
            loginClickCallback(response.data.data);
            closeFn();
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const response = await userApi.register(loginData);
            setLoginData({
                ...loginData,
                username: response?.data?.data?.username
            });
            setIsLogin(true);
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                console.log(err.message);
            }
        }
    }

    return <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
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
    </div>;
}
