import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect } from 'react';
import Button from '../helpers/Button';
import ToggleSwitch from '../helpers/ToggleSwitch';

function useOutsideCollapse(ref, closeModal) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

function SettingLaunch({ closeModal }) {
    const wrapperRef = useRef(null);
    useOutsideCollapse(wrapperRef, closeModal);
    const router = useRouter();

    function goToLiveResult () {
        router.push({
            pathname: `/result`,
            query: {id: `${router.query.id}`, ltik: `${router.query.ltik}`}
        });
    }

    return (
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                    ref={wrapperRef}
                >
                    <p className="text-xl font-bold mb-1">
                        Cài đặt chế độ hiển thị kết quả{' '}
                    </p>
                    <hr />
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex justify-between items-center">
                            <p>Hiển thị tên</p>
                            <ToggleSwitch />
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Xáo trộn câu hỏi</p>
                            <ToggleSwitch />
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Xáo trộn câu trả lời</p>
                            <ToggleSwitch />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-8 justify-end">
                        <Button type="button" variants="secondary" onClick={closeModal}>
                            Hủy
                        </Button>
                        <Button type="button" variants="primary" onClick={goToLiveResult}>
                            Bắt đầu
                        </Button>
                    </div>
                </form>
            </div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full"></div>
        </div>
    );
}

export default SettingLaunch;
