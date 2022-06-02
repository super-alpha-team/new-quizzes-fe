import Draggable from 'components/helpers/Draggable';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd/dist/core/';
import React, { useState, useEffect } from 'react';
import Droppable from 'components/helpers/Droppable';
import Answer from 'components/helpers/Answer';
import SubmitButton from 'components/helpers/SubmitButton';
import { randomHexColor } from 'utils/helpers';
import TeXDisplay from 'components/helpers/TeXDisplay';
import parse from 'html-react-parser';

function DragDrop({ data, handleAnswer }) {
  const [results, setResults] = useState({});
  const [colors, setColors] = useState([]);

  function collectResults(result) {
    setResults(Object.assign(results, result));
  }

  function onSubmit() {
    console.log(results);
  }

  useEffect(() => {
    // setColors(Object.fromEntries(data.choices));
    setColors(Array(data.length).fill(0).map(c => randomHexColor()));

    return () => {

    };
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
      <DndProvider backend={HTML5Backend}>
        <div className='w-full mb-5 inline-block text-center'>
          {/* <TeXDisplay content={data.qtext.replace(/\[\[\w\]\]/g, (match) => <Droppable type={match.match(/\w/)} color={colors[match.match(/\w/)]} />)} /> */}
          {data.fragments.map((fragment, index) => {
            return <div key={index}>
              <span dangerouslySetInnerHTML={{ __html: fragment }} />
              {index != data.fragments.length-1 ? <Droppable type={`${index}`} color={colors[index]} /> : <></>}
            </div>;
          })}
          {/* <Droppable type={'1'} color={colors[0]} /> is an important invention of human. <Droppable type={'2'} color={colors[1]} /> is an animal. */}
        </div>
        <div className='w-full grid grid-cols-2 gap-2'>
          {
            data.choices?.map(({ type, items }) =>
              <div key={type} className='flex flex-col items-center gap-2' >
                {
                  items.map(item =>
                    <Draggable key={item.id} item={JSON.stringify(item)} type={`${type}`} collectResults={collectResults} >
                      <Answer content={item.answer} color={colors[type]} />
                    </Draggable>)
                }
              </div>)
          }
        </div>
        <div className='self-end'>
          <SubmitButton text={'Submit'} onSubmit={onSubmit} />
        </div>
      </DndProvider>
    </div>
  );
}

export default DragDrop;