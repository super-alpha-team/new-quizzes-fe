import React from 'react';

function TopCard() {
    return (
        <div className="w-92 rounded-xl overflow-hidden shadow-lg">
            <div className="w-20 h-20 rounded-full border-2 m-auto mt-4"></div>
            <div className="px-6 py-4 flex flex-col justify-center items-center">
                <div className="font-bold text-xl mb-2">Nguyễn Thanh Tùng</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-center items-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #topclass
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #winter
                </span>
            </div>
            <div>

            </div>
        </div>
    );
}

export default TopCard;
