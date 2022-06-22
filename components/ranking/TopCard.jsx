import { BigHead } from '@bigheads/core';
import { useEffect, useState } from 'react';
import { setRankColor } from 'utils/helpers';

const default_name = '___';
const unknow_field = '_';

function TopCard({ data, listStudentJoined }) {
    const [ava, setAva] = useState({});
    useEffect(() => {
        if (data) {
            setAva(listStudentJoined.filter((student) => student.id == data.id)[0]?.ava);
        }

    }, [data]);


    if (!data) {
        return (
            <div className="w-92 rounded-xl overflow-hidden shadow-lg">
                <div className="w-24 h-24 rounded-full m-auto mt-4">
                    <BigHead {...ava} />
                </div>
                <div className="px-6 pt-4 pb-2 flex flex-col justify-center items-center">
                    <div className="font-bold text-xl mb-2">{data?.username || default_name}</div>
                    <p className={"text-sm rounded-full border-[1px] text-white w-[2rem] h-[2rem] flex justify-center items-center" + (data?.rank == 1 ? ' bg-qyellow border-qyellow-light' : data?.rank == 2 ? ' text-white bg-[#7E8283] border-qgray' : data?.rank == 3 ? ' text-white bg-qorange border-qorange-light' : ' text-black bg-qgray border-qgray-light')}>
                        <span className='text-xs'>#</span>{data?.rank || unknow_field}
                    </p>
                </div>
                <div className="px-6 py-2 flex justify-center items-center">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Score: {data?.sum_grade == undefined ? unknow_field : parseFloat(Number(data?.sum_grade).toFixed(2))}
                    </span>
                </div>
                <div>

                </div>
            </div>
        );
    }
    return (
        <div className="w-92 rounded-xl overflow-hidden shadow-lg">
            <div className="w-24 h-24 rounded-full m-auto mt-4">
                <BigHead {...ava} />
            </div>
            <div className="px-6 pt-4 pb-2 flex flex-col justify-center items-center">
                <div className="font-bold text-xl mb-2">{data?.username || default_name}</div>
                <p className={"text-sm rounded-full border-[1px] text-white w-[2rem] h-[2rem] flex justify-center items-center"+ (data?.rank == 1 ? ' bg-qyellow border-qyellow-light' : data?.rank == 2 ? ' text-white bg-[#7E8283] border-qgray' : data?.rank == 3 ? ' text-white bg-qorange border-qorange-light' : ' text-black bg-qgray border-qgray-light')}>
                    <span className='text-xs'>#</span>{data?.rank || unknow_field}
                </p>
            </div>
            <div className="px-6 py-2 flex justify-center items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Score: {data?.sum_grade == undefined ? unknow_field : parseFloat(Number(data?.sum_grade).toFixed(2))}
                </span>
            </div>
            <div>

            </div>
        </div>
    );
}

export default TopCard;
