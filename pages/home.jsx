import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../components/Header';

function HomePage() {
    const router = useRouter();

    useEffect(() => {
    }, [router.query.ltik]);

    async function handleStartQuiz() {
        const response = await axios.post(`http://localhost:5000/lti/quiz/${router.query.id}/start`, {},
            { headers: { "Authorization": `Bearer ${router.query.ltik}` } });

        alert('Quiz started!');
    }

    return (
        <div className="w-screen h-screen">
            <Header />
            
            <div className="bg-blue-lightDark m-auto mt-4 w-32  hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center"
                onClick={handleStartQuiz}
            >
                <p>Start Quiz</p>
            </div>
        </div>
    );
}

export default HomePage;
