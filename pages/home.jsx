import React, { useEffect } from 'react';
import Header from '../components/Header';

function HomePage() {

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
