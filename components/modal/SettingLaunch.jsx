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

function SettingLaunch({ data, closeModal, settingStartQuiz }) {
    const wrapperRef = useRef(null);
    useOutsideCollapse(wrapperRef, closeModal);
    const router = useRouter();

    function goToLiveResult () {
        settingStartQuiz({
            showNameSetting,
            shuffleQuestionSetting,
            shuffleAnswerSetting,
        });
    }

    // state show name setting
    const [showNameSetting, setShowNameSetting] = useState(data.showNameSetting || true);
    // state shuffle question setting
    const [shuffleQuestionSetting, setShuffleQuestionSetting] = useState(data.shuffleQuestionSetting || false);
    // state shuffle answer setting
    const [shuffleAnswerSetting, setShuffleAnswerSetting] = useState(data.shuffleAnswerSetting || false);

    return (
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                    ref={wrapperRef}
                >
                    <p className="text-xl font-bold mb-1">
                        Setting username display mode{' '}
                    </p>
                    <hr />
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex justify-between items-center">
                            <p>Display username</p>
                            <ToggleSwitch isToggle={showNameSetting} setIsToggle={setShowNameSetting} />
                        </div>
                        <div className="flex justify-between items-center">
                            <p>X??o tr???n c??u h???i</p>
                            <ToggleSwitch isToggle={shuffleQuestionSetting} setIsToggle={setShuffleQuestionSetting}/>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Shuffle answers</p>
                            <ToggleSwitch isToggle={shuffleAnswerSetting} setIsToggle={setShuffleAnswerSetting}/>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-8 justify-end">
                        <Button type="button" variants="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="button" variants="primary" onClick={goToLiveResult}>
                            Start
                        </Button>
                    </div>
                </form>
            </div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full"></div>
        </div>
    );
}

export default SettingLaunch;
