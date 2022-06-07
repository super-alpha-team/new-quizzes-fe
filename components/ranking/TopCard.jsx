import React from 'react';

const default_name = 'default_name';
const unknow_field = 'unknown';

function TopCard({ data }) {
    if (!data) {
        return <></>;
    }
    return (
        <div className="w-92 rounded-xl overflow-hidden shadow-lg">
            <div className="w-20 h-20 rounded-full border-2 m-auto mt-4"></div>
            <div className="px-6 py-4 flex flex-col justify-center items-center">
                <div className="font-bold text-xl mb-2">{data?.username || default_name}</div>
                <p className="text-gray-700 text-base">
                    # {data?.rank || unknow_field}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-center items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Your grade: {data?.sum_grade || unknow_field}
                </span>
            </div>
            <div>

            </div>
        </div>
    );
}

export default TopCard;
