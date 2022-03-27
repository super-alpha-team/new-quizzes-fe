import React, { useEffect } from 'react';
import Header from '../components/Header';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:5000');

function HomePage() {
    // useEffect(() => {

    //     socket.on('connect', () => {
    //         console.log(`my socket id: ${socket.id}`);
            
    //         socket.emit('join', { username: 'chloe', room: 'room001' });
    //     });

    //     socket.on('data', data => {
    //         console.log(data);
    //     });

    //     socket.on('question', data => {
    //         console.log('question');
    //         console.log(data);
    //     });

    //     socket.emit('send', { room: socket.id, new_quiz_id: 'bla', idtoken_id: 'bla', answer_log_data: 'bla' });

    //     return () => socket.disconnect();
    // }, []);

    return (
        <div className="w-screen h-screen">
            <Header />
            
            <div className="bg-blue-lightDark m-auto mt-4 w-32  hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center">
                <p>Start Quiz</p>
            </div>
        </div>
    );
}

export default HomePage;
