import React, { useState } from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import { randomHexColor } from 'utils/helpers';

function Draggable({ type, item, children, collectResults }) {
    const [didDrop, setDidDrop] = useState(false);
    const [collected, dragRef] = useDrag(() => ({
        type,
        item: JSON.parse(item),
        end: (item, monitor) => {
            setDidDrop(monitor.didDrop());
            collectResults(monitor.getDropResult()?.result);
        }
        // ,
        // collect: monitor => ({
        //     opacity: monitor.isDragging() ? 0.5 : 1,
        // })
    }));
    return (
        didDrop ? <></> :
            <div ref={dragRef} className='cursor-grab active:cursor-grabbing' >
                {children}
            </div>
    );
}

export default Draggable;