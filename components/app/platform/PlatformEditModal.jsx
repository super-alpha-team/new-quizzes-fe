
import Button from "components/helpers/Button";

import platformApi from "apis/platformApi";
import { useState } from "react";
import { get_accessToken_localStorage } from "utils/localStore";
import Alert from "components/helpers/Alert";

export default function PlatformEditModal({ platformData, closeFn, callBackFn, toggleLogin }) {
    const [data, setData] = useState({
        id: platformData?.id,
        name: platformData?.platform?.name,
        access_token: platformData?.new_plat?.access_token,
    });
    const [noti, setNoti] = useState({ msg: '', isError: false });

    async function handleClick() {
        let token = get_accessToken_localStorage();
        if (!token) {
            return toggleLogin();
        }
        try {
            const editedResponse = await platformApi.edit(token, data?.id, data);
            callBackFn(editedResponse.data.data);
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
    }

    function alertError(msg) {
        setNoti({ isError: true, msg });
    }
    return (
        <>
        {noti.msg && <Alert message={noti.msg} isError={noti.isError} hideAlert={() => setNoti({ msg: '', isError: false })} />}
            <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                >
                    <p className="text-xl font-bold mb-1">
                        Cập nhật
                    </p>
                    <hr />
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex justify-between items-start flex-col">
                            <p>Name</p>
                            <input
                                type={'text'}
                                placeholder='Enter your name...'
                                className='w-1/4 min-w-[17rem] shalow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2 italic'
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-between items-start flex-col">
                            <p>Access Token</p>
                            <input
                                type="text"
                                placeholder='Enter your token...'
                                className='w-1/4 min-w-[17rem] shalow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2 italic'
                                value={data.access_token}
                                onChange={(e) => setData({ ...data, access_token: e.target.value })}
                            />
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
                        <Button
                            type="button"
                            variants="primary"
                            onClick={handleClick}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}