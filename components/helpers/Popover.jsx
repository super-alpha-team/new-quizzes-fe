import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Popover = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    function toggleVisibility() {
        setVisible(!visible);
    }

    useImperativeHandle(
        ref,
        () => {
            return { toggleVisibility };
        },
    );

    function clickInside(e) {
        e.stopPropagation();
    }

    return (visible &&
        <div className='w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-40 z-10' onClick={toggleVisibility}>
            <div className='flex justify-center items-center' onClick={clickInside}>
                {props.children}
            </div>
        </div>
    );
});

Popover.displayName = 'Popover';

export default Popover;