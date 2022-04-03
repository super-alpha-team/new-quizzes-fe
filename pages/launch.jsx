import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import SettingLaunch from '../components/modal/SettingLaunch';
import Button from '../components/helpers/Button';

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
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/image/18915856.jpg"
                        width={400}
                        height={400}
                        alt="team"
                        className="cursor-pointer"
                    />
                    <Button
                        type="button"
                        variants="primary"
                        onClick={handleOpenModal}
                        className="w-32"
                    >
                        Start quiz
                    </Button>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/image/54950.jpg"
                        width={400}
                        height={400}
                        alt="team"
                        className="cursor-pointer"
                    />
                    <Button type="button" variants="primary" className="w-32">
                        Start quiz
                    </Button>
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
