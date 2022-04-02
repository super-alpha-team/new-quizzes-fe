import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import SettingLaunch from '../components/modal/SettingLaunch';

function HomePage() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {}, [router.query.ltik]);

    async function handleStartQuiz() {
        const response = await axios.post(
            `http://localhost:5000/lti/quiz/${router.query.id}/start`,
            {},
            { headers: { Authorization: `Bearer ${router.query.ltik}` } }
        );

        alert('Quiz started!');
    }

    function handleOpenModal() {
        setIsModalVisible(true);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
    }

    return (
        <div className="w-screen h-screen">
            <Header />

            <div className="flex gap-20 justify-center mt-20">
                <div>
                    <Image
                        src="/image/18915856.jpg"
                        width={400}
                        height={400}
                        alt="team"
                        className="cursor-pointer"
                    />
                    <div
                        className="bg-blue-lightDark m-auto mt-4 w-32  hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center"
                        onClick={handleOpenModal}
                    >
                        <p>Start Quiz</p>
                    </div>
                </div>

                <div>
                    <Image
                        src="/image/54950.jpg"
                        width={400}
                        height={400}
                        alt="team"
                        className="cursor-pointer"
                    />
                    <div className="bg-blue-lightDark m-auto mt-4 w-32  hover:bg-blue-dark text-white font-bold py-2 px-4 rounded duration-300 cursor-pointer flex justify-center">
                        <p>Play team</p>
                    </div>
                </div>
            </div>
            {isModalVisible ? (
                <SettingLaunch closeModal={handleCloseModal} />
            ) : (
                ''
            )}
        </div>
    );
}

export default HomePage;
