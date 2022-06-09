import { useState } from 'react';
import Button from "components/helpers/Button";

export default function NameModal({ nameClickCallback, closeFn, title = "Name" }) {

    const [nameData, setNameData] = useState('');

    async function handleClick(e) {
        e.preventDefault();
        nameClickCallback(nameData);
        closeFn();
    }

    return <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
            <div className="flex flex-row justify-between">
                <p className="text-xl font-bold mb-1">
                    {title}
                </p>
            </div>
            <hr />
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-start flex-col">
                    <p>Name</p>
                    <input
                        type={'text'}
                        placeholder='Enter name...'
                        className='w-1/4 min-w-[17rem] shalow-dark border-black border-2 rounded-md h-10 focus:outline-none p-2'
                        value={nameData.username}
                        onChange={(e) => setNameData(e.target.value)} />
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
                        Create
                    </Button>
            </div>
        </form>
    </div>;
}
