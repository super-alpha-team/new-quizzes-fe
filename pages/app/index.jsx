import React, { useState, useRef, useEffect } from 'react';

import Header from 'components/Header';
import Popover from 'components/helpers/Popover';
import Credential from 'components/Credential';
import Button from "components/helpers/Button";
import PlatformEditModal from 'components/app/platform/PlatformEditModal';
import LoginModal from 'components/app/auth/LoginModal';

import { userApi } from 'apis/userApi';
import platformApi from 'apis/platformApi';
import { get_accessToken_localStorage, save_accessToken_localStorage } from 'utils/localStore';

function App() {
    const [credentials, setCredentials] = useState([]);
    const [title, setTitle] = useState('');
    const popupRef = useRef(null);
    const credentialRef = useRef(null);
    const loginRef = useRef(null);
    const editCredentialRef = useRef(null);
    const [credential, set_credential] = useState(null);

    const [userLoginData, setUserLoginData] = useState({
        account: {
            additional_info: null,
            createdAt: null,
            id: 0,
            password: "",
            updatedAt: null,
            username: ""
        },
        accessToken: '',
    });

    async function init() {
        const accessToken = get_accessToken_localStorage();
        if (!accessToken) {
            return toggleLogin();
        } else {
            try {
                const loginUserResponse = await userApi.me(accessToken);
                setUserLoginData({
                    ...userLoginData,
                    accessToken,
                    account: loginUserResponse.data.data.account,
                });
                getPlatformList();
            } catch (e) {
                console.log(e);
                toggleLogin();
            }
        }
    }

    useEffect(() => {
        init();
    }, []);

    async function createNewCredential(credential) {
        let token = get_accessToken_localStorage();
        if (!token) {
            return toggleLogin();
        }
        try {
            const response = await platformApi.create(token, credential);
            setCredentials(credentials.concat(response.data.data));
            toggleCredential();
            setTitle('');
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                console.log(err);
            }
        }
    }

    function formOnSubmit(e) {
        e.preventDefault();
        if (title) {
            togglePopup();
            toggleCredential();
        }
    }

    const togglePopup = () => popupRef.current.toggleVisibility();
    const toggleCredential = () => credentialRef.current.toggleVisibility();
    const toggleLogin = () => loginRef.current.toggleVisibility();
    const toggleEditCredential = () => editCredentialRef.current.toggleVisibility();

    async function loginClickCallback(loginData) {
        save_accessToken_localStorage(loginData.accessToken);
        init();
    }

    async function getPlatformList() {
        let token = get_accessToken_localStorage();
        if (!token) {
            return toggleLogin();
        }
        try {
            const getPlatformListResponse = await platformApi.getAll(token);
            setCredentials(getPlatformListResponse.data.data.platforms);
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                console.log(err);
            }
        }
    }

    async function editCredential(credential) {
        set_credential(credential);
        toggleEditCredential();
    }
    async function editCredentialCallback() {
        getPlatformList();
    }

    async function deleteCredential(credential) {
        let token = get_accessToken_localStorage();
        if (!token) {
            return toggleLogin();
        }
        if (confirm('Are you sure you want to delete this credential?')) {
            try {
                await platformApi.delete(token, credential.id);
                setCredentials(credentials.filter(c => c.id !== credential.id));
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.message);
                } else {
                    console.log(err);
                }
            }
        }
    }

    return (<>
        <Popover ref={loginRef}>
            <LoginModal
                loginClickCallback={loginClickCallback}
                closeFn={toggleLogin}
            />
        </Popover>
        <Popover ref={popupRef}>
            <div className='w-72 h-52 mb-32 shadow-sm shadow-[#91A8ED] bg-white rounded-lg relative flex justify-center'>
                <p className='text-blue-dark after:block after:w-full after:h-3 after:bg-[#91A8ED] after:-mt-3 after:bg-opacity-60 tracking-tight font-mono text-lg font-bold top-4 left-3 absolute py-2'>Create new credential</p>
                <button className='text-sm text-[#91A8ED] hover:text-[#6e89db] p-2 top-0 right-0 absolute' onClick={togglePopup}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                </button>
                <form className='w-full flex flex-col justify-center items-center mb-4' onSubmit={formOnSubmit}>
                    <p className='w-11/12 text-blue-dark text-sm font-semibold py-1'>Title</p>
                    <input onChange={({ target }) => setTitle(target.value)} value={title} className='w-11/12 p-2 outline-1 outline focus:outline-[#6e89db] text-sm text-blue-dark rounded-sm placeholder:italic' type="text" placeholder='Enter credential title' required />
                    <button type='submit' className='text-[#6e89db] rounded-md hover:bg-[#6e89db] hover:text-white font-semibold text-sm px-8 py-2 border-[0.05rem] border-[#91A8ED] bottom-4 absolute'>Next</button>
                </form>
            </div>
        </Popover>
        <Popover ref={credentialRef}>
            <Credential name={title} onSubmit={createNewCredential} />
        </Popover>
        <Popover ref={editCredentialRef}>
            <PlatformEditModal
                platformData={credential}
                closeFn={toggleEditCredential}
                callBackFn={editCredentialCallback}
                toggleLogin={toggleLogin}
            />
        </Popover>
        {/* <Popover ref={deleteCredentialRef}>
            <p>Cancel</p>
            <p onClick={deleteCredentialConfirm}>Confirm</p>
        </Popover> */}
        <div className='min-w-screen min-h-screen bg-gray-100 flex flex-col'>
            <Header />
            <div className='w-full lg:w-5/6 self-center mb-20 mt-8'>
                <div className='mt-7 flex flex-col gap-2'>
                    {
                        userLoginData?.accessToken ? <p className='font-bold'>
                            Wellcome: {userLoginData?.account?.username}
                        </p> : <Button
                            onClick={toggleLogin}
                            type="button"
                            variants="primary"
                            className='font-bold'>
                            Login
                        </Button>
                    }
                    <hr />

                    <div className='flex justify-between mt-4'>
                        <div className='font-bold'>Credential List</div>
                        <div className='text-[#6e89db] hover:text-[#91A8ED] hover:cursor-pointer'><a onClick={togglePopup}>+ Create a new credential</a></div>
                    </div>
                    <div className='shadow-md'>
                        <table className='min-w-max w-full'>
                            <thead>
                                <tr className='bg-[#91A8ED] text-white'>
                                    {/* {Object.keys(credentials[0]).map((key) => <th key={key} className='py-3 px-6 text-left capitalize'>{key}</th>)} */}
                                    <th className='py-3 px-6 text-left capitalize'>id</th>
                                    <th className='py-3 px-6 text-left capitalize'>name</th>
                                    <th className='py-3 px-6 text-left capitalize'>key</th>
                                    <th className='py-3 px-6 text-center capitalize'>actions</th>
                                </tr>
                            </thead>
                            <tbody className='odd:bg-white even:bg-slate-100'>
                                {credentials.map(credential =>
                                    <tr key={credential.id} className='border-b border-[#91A8ED] hover:bg-gray-100'>
                                        <td className='py-3 px-6'>{credential.id}</td>
                                        <td className='py-3 px-6'>{credential.platform?.name}</td>
                                        <td className='py-3 px-6'>{credential.platform?.clientId}</td>
                                        <td className='py-3 px-6'>
                                            <div className='flex item-center justify-center'>
                                                {/* <div className='w-4 mr-2 transform hover:text-[#91A8ED] hover:scale-110 hover:cursor-pointer'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                                    </svg>
                                                </div> */}
                                                <div className='w-4 mr-2 transform hover:text-[#91A8ED] hover:scale-110 hover:cursor-pointer' onClick={() => editCredential(credential)}>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                                                    </svg>
                                                </div>
                                                <div className='w-4 mr-2 transform hover:text-[#91A8ED] hover:scale-110 hover:cursor-pointer' onClick={() => deleteCredential(credential)}>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default App;
