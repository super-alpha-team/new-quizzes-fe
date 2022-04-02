import React, { useRef, useState, useEffect } from 'react';

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
    const [isToggle, setIsToggle] = useState(false);

    const toggleClass = ' transform translate-x-5';

    return (
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 ">
            <div className="max-w-lg relative mx-auto mt-24 bg-gray-400 z-50">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    ref={wrapperRef}
                >
                    <div
                        className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
                        onClick={() => {
                            setIsToggle(!isToggle);
                        }}
                    >
                        <div
                            className={
                                'md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
                                (!isToggle ? ' bg-white' : ' bg-black transform translate-x-5')
                            }
                        ></div>
                    </div>
                </form>
            </div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full"></div>
        </div>
    );
}

export default SettingLaunch;
