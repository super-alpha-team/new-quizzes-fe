import React from 'react';
import Header from '../components/Header';
import ToggleSwitch from '../components/helpers/ToggleSwitch';
import TopCard from '../components/ranking/TopCard';

function LiveResult() {
    return (
        <div className="w-screen h-screen">
            <Header />
            <div className="w-10/12 m-auto">
                <div className="grid grid-cols-3 mt-8">
                    <div></div>
                    <div className="flex justify-center">Top Student</div>
                    <div className="flex justify-end">
                        <div className="flex items-center gap-4">
                            <p>Hiển thị tên</p>
                            <ToggleSwitch />
                        </div>
                    </div>
                </div>
                <div className="flex gap-8 justify-center">
                    <TopCard />
                    <TopCard />
                    <TopCard />
                </div>
            </div>
        </div>
    );
}

export default LiveResult;
