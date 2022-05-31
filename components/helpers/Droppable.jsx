import React, { useState } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import Answer from './Answer';
import Draggable from './Draggable';

function Droppable({ type, color }) {
  const [item, setItem] = useState(null);
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: type,
      drop: (item, monitor) => {
        setItem(item.answer);
        return { result: { [`${type}`]: item.id } };
      },
      collect: (monitor, props) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    })
  );

return (
  <>
    <span ref={dropRef} className={'inline-block'} >
      {item ? <Answer content={item} color={color} /> : <Answer content={''} color={color} />}
    </span>
  </>
);
}

export default Droppable;