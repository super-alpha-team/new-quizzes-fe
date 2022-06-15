import React, { useEffect, useState } from 'react';
import Button from '../helpers/Button';
import JoiningCard from './JoiningCard';

function WaitingRoom({ listStudentJoined, startGameFn }) {
    const [listStudentName, setListStudentName] = useState([]);
    console.log('liststudentjoid', listStudentJoined);

    useEffect(() => {
        setListStudentName(listStudentJoined);
    }, [listStudentJoined]);

    function handleStartGame() {
        startGameFn();
    }

    return (
        <div>
            <p className="text-2xl text-center p-4">
                Do you see your name ???
            </p>
            <div className='flex justify-end mr-32 mb-4'>
                <Button variants='primary' onClick={handleStartGame}>
                    Let`s play
                </Button>
            </div>
            <div className="flex justify-center">
                <div className="flex-wrap gap-6 mt-6 flex justify-center">
                    {listStudentName.map((student, index) => (
                        <JoiningCard name={student.name} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WaitingRoom;

