import { BigHead } from '@bigheads/core';
import React, { useEffect, useState } from 'react';

const default_name = 'default_name';
const unknow_field = 'unknown';

function TopCard({ data, listStudentJoined }) {
    const [ava, setAva] = useState({});
    useEffect(() => {
        if(data){
            setAva(listStudentJoined.filter((student) => student.id == data.id)[0])
        }
        
    })

    if (!data) {
        return <></>;
    }
    return (
        <div className="w-92 rounded-xl overflow-hidden shadow-lg">
            <div className="w-24 h-24 rounded-full m-auto mt-4">
            <BigHead {...ava} />
            </div>
            <div className="px-6 py-4 flex flex-col justify-center items-center">
                <div className="font-bold text-xl mb-2">{data?.username || default_name}</div>
                <p className="text-gray-700 text-base">
                    # {data?.rank || unknow_field}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-center items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Your grade: {data?.sum_grade == undefined ? unknow_field : parseFloat(Number(data?.sum_grade).toFixed(2))}
                </span>
            </div>
            <div>

            </div>
        </div>
    );
}

export default TopCard;
