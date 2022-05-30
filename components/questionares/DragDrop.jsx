import Draggable from 'components/helpers/Draggable';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd/dist/core/';
import React from 'react';
import Droppable from 'components/helpers/Droppable';
import Answer from 'components/helpers/Answer';

function DragDrop({ data, handleAnswer }) {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className='w-full mb-5 inline-block'>
          <Droppable type={'1'} /> is an important invention of human. <Droppable type={'2'} /> is an animal.
        </div>
        <div className='grid gap-2'>
          {data.map(type => (
            type.map((item) => (
              <Draggable key={item.id} item={item.answer} type={`${item.id}`}>
                <Answer content={item.answer} />
              </Draggable>
            ))
          ))}
        </div>
      </DndProvider>
    </>
  );
}

export default DragDrop;