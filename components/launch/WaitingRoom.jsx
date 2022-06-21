import { BigHead } from '@bigheads/core';
import React, { useEffect, useState } from 'react';
import Button from '../helpers/Button';
import JoiningCard from './JoiningCard';

function WaitingRoom({ listStudentJoined, startGameFn }) {
    const [listStudentName, setListStudentName] = useState([]);
    useEffect(() => {
        setListStudentName(listStudentJoined);
    }, [listStudentJoined]);

    function handleStartGame() {
        startGameFn();
    }

    return (
        <div>
            {/* <p className="text-2xl text-center p-4">
               Waiting for students to join
            </p> */}
            <div className="w-full justify-center flex p-4 font-semibold text-xl text-black items-center bg-qpurple-lighter">
                <svg className="animate-spin mr-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                Waiting for students to join...
            </div>
            <div className='flex justify-end items-end px-24 my-4'>
                <Button variants='qpurple' onClick={handleStartGame} className="w-32">
                    {`play`}
                </Button>
            </div>
            <div className="flex justify-center">
                <div className="flex-wrap gap-6 mt-6 flex justify-center">
                    {listStudentName.map((student, index) => (
                        <JoiningCard name={student.name} key={index} ava={student.ava} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WaitingRoom;

