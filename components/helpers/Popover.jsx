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
        <div className='min-w-screen min-h-screen h-full w-full flex justify-center items-center fixed bg-black bg-opacity-40 z-10' onClick={toggleVisibility}>
            <div className='flex justify-center items-center' onClick={clickInside}>
                {props.children}
            </div>
        </div>
    );
});

Popover.displayName = 'Popover';

export default Popover;