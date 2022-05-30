import React, { useState } from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import { randomHexColor } from 'utils/helpers';

function Draggable({ type, item, children }) {
    const [didDrop, setDidDrop] = useState(false);
    const [{ opacity }, dragRef] = useDrag(() => ({
        type,
        item: { item },
        end: (item, monitor) => {
            setDidDrop(monitor.didDrop());
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    }));
    return (
        didDrop ? <></> :
            <div ref={dragRef} style={{ opacity }}>
                {children}
            </div>
    );
}

export default Draggable;