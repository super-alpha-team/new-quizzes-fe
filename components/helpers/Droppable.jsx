import React, { useState } from 'react';
import { useDrop } from 'react-dnd/dist/hooks';
import Answer from './Answer';
import Draggable from './Draggable';

function Droppable({ type, children }) {
  const [item, setItem] = useState(null);
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: type,
      drop: item => setItem(item.item),
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      })
    })
  );

  return (
    <>
      <span ref={dropRef} className={'inline-block'} >
        {item ? <Answer content={item} /> : <Answer content={''} />}
      </span>
    </>
  );
}

export default Droppable;