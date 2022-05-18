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
            <p className="text-2xl text-center p-4">
                Tìm kiếm tên bạn trên đây nhé{' '}
            </p>
            <div className='flex justify-end mr-32 mb-4'>
                <Button variants='primary' onClick={handleStartGame}>
                    Chơi game
                </Button>
            </div>
            <div className="flex justify-center">
                <div className="flex-wrap gap-6 mt-6 flex justify-center">
                    {listStudentName.map((name, index) => (
                        <JoiningCard name={name} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WaitingRoom;

