import platformApi from "apis/platformApi";
import Alert from "components/helpers/Alert";
import { useState } from "react";
import { get_accessToken_localStorage } from "utils/localStore";

export default function PlatformEditModal({ platformData, togglePopup, callBackFn }) {
    const [data, setData] = useState({
        id: platformData?.id,
        name: platformData?.platform?.name,
        access_token: platformData?.new_plat?.access_token,
    });
    const [noti, setNoti] = useState({ msg: '', isError: false });

    async function formOnSubmit() {
        let token = get_accessToken_localStorage();
        if (!token) {
            alertError("You have not logged in!");
        }
        try {
            const editedResponse = await platformApi.edit(token, data?.id, data);
            callBackFn(editedResponse.data.data);
            togglePopup();
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
    }

    function alertError(msg) {
        setNoti({ isError: true, msg });
    }
    return (
        <>
            {noti.msg && <Alert message={noti.msg} isError={noti.isError} hideAlert={() => setNoti({ msg: '', isError: false })} />}
            <div className='relative w-max h-max min-h-[16rem] min-w-[18rem] p-4 shadow-sm shadow-qpurple-light bg-white rounded-lg flex flex-col justify-between'>
                <p className='w-max text-qpurple-dark after:block after:w-full after:h-3 after:bg-qpurple-light after:-mt-3 after:bg-opacity-60 tracking-tight font-mono text-lg font-bold py-2'>Edit Credential</p>
                <button className='absolute top-0 right-0 text-sm text-qpurple-light hover:text-qpurple p-2' onClick={togglePopup}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                </button>
                <form className='w-full h-full flex flex-col justify-between items-center' onSubmit={formOnSubmit}>
                    <p className='text-qpurple-dark self-start text-sm font-semibold py-1'>Name</p>
                    <input onChange={({ target }) => setData(v => ({ ...v, name: target.value }))} value={data.name} className='w-full py-2 px-1 outline-1 outline focus:outline-qpurple text-sm text-qpurple-dark rounded-sm placeholder:italic' type="text" placeholder='Enter username' required />
                    <p className='text-qpurple-dark self-start text-sm font-semibold py-1'>Access Token</p>
                    <input onChange={({ target }) => setData(v => ({ ...v, access_token: target.value }))} value={data.access_token} className='w-full py-2 px-1 outline-1 outline focus:outline-qpurple text-sm text-qpurple-dark rounded-sm placeholder:italic' type="text" placeholder='Enter password' required />
                    <button type='submit' className='w-full mt-4 hover:opacity-80 rounded-md bg-qpurple text-white font-semibold text-sm px-4 py-2 border-[0.05rem] border-qpurple-light'>Submit</button>
                </form>
            </div>
        </>
    );
}