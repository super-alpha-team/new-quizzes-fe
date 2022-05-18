import React, { useState } from 'react';

function ToggleSwitch( {
    isToggle,
    setIsToggle,
    ...rest
}) {

    return (
        <div
            {...rest}
            className={
                'md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transform duration-300 ease-in-out ' +
                (!isToggle ? 'bg-gray-300' : 'bg-blue-100')
            }
            onClick={() => {
                setIsToggle(!isToggle);
            }}
        >
            <div
                className={
                    'md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
                    (!isToggle
                        ? ' bg-white'
                        : ' bg-blue-dark transform translate-x-6')
                }
            ></div>
        </div>
    );
}

export default ToggleSwitch;
