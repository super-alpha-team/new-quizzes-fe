import { userApi } from 'apis/userApi';
import Alert from 'components/helpers/Alert';
import Popover from 'components/helpers/Popover';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { delete_accessToken_localStorage, get_accessToken_localStorage, save_accessToken_localStorage } from 'utils/localStore';
import LoginModal from '../auth/LoginModal';
import Button from './Button';

function PlatformHeader() {
  const loginRef = useRef(null);
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [noti, setNoti] = useState({ msg: '', isError: false });

  function alertMessage(msg) {
    setNoti({ ...noti, msg });
  }

  function alertError(msg) {
    setNoti({ isError: true, msg });
  }

  function catchError(error) {
    if (error.response) {
      alertError(error.response.data?.message);
    } else {
      alertError(error.message);
    }
  }

  const router = useRouter();
  function navigate() {
    router.push('/home');
  }
  function navigateToApp() {
    router.push('/platform');
  }

  function init() {
    const accessToken = get_accessToken_localStorage();
    if (accessToken) {
      userApi.me(accessToken)
        .then(response => {
          setUserLoginData({
            ...userLoginData,
            accessToken,
            account: response.data.data.account,
          });
          alertMessage(`Good day ${response.data.data.account.username}!`);
        })
        .catch(error => {
          catchError(error);
        });
    }
  }

  useEffect(() => {
    init();
  }, []);

  const toggleLogin = () => loginRef.current.toggleVisibility();

  async function loginClickCallback(loginData) {
    save_accessToken_localStorage(loginData.accessToken);
    init();
  }

  function logout() {
    delete_accessToken_localStorage();
    setUserLoginData({
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
    alertMessage("Logout successful");
  }

  return (
    <>
      {noti.msg && <Alert message={noti.msg} isError={noti.isError} hideAlert={() => setNoti({ msg: '', isError: false })} />}
      <Popover ref={loginRef}>
        <LoginModal
          loginClickCallback={loginClickCallback}
          togglePopup={toggleLogin}
        />
      </Popover>
      <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 py-2 px-4 w-full font-display font-semibold'>
        <div className='flex justify-between'>
          <p className='cursor-pointer flex items-center' onClick={navigate}>New Quizzes</p>
          {
            userLoginData?.accessToken ?
              <div>
                <div onClick={() => setShowDropdown(!showDropdown)} className='font-bold text-white uppercase min-w-[2rem] h-[2rem] flex items-center justify-center cursor-pointer bg-qgreen rounded-full'>{userLoginData?.account?.username[0]}</div>
                <ul className={'font-normal absolute z-20 top-10 right-4 rounded-md p-2 bg-white shadow-md' + (showDropdown ? ' block' : ' hidden')}>
                  <li className='italic font-light border-b-[1px] w-full p-2 border-qgray-light'>Welcome {userLoginData?.account?.username}!</li>
                  <li onClick={navigateToApp} className='hover:bg-qgray-light cursor-pointer border-b-[1px] w-full p-2 border-qgray-light'>
                    LTI management
                  </li>
                  <li onClick={logout} className='hover:bg-qgray-light flex gap-2 items-center cursor-pointer border-b-[1px] w-full p-2 border-qgray-light'>
                    <p>Logout</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                  </li>
                </ul>
              </div>
              : <Button onSubmit={toggleLogin}>Login</Button>
          }
        </div>
      </div>
    </>
  );
}

export default PlatformHeader;