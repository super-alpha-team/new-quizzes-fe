import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import SettingLaunch from '../components/modal/SettingLaunch';
import Button from '../components/helpers/Button';
import { LOCALHOST, SERVER_URL } from '../utils/config';

function HomePage() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // state newQuizInstance
    const [newQuizInstance, setNewQuizInstance] = useState({});

    // state settingData
    const [settingData, setSettingData] = useState({});

    useEffect(() => {
        async function getData() {
            try {
                if (router.query.id == undefined) return;
                const newQuizInstance = await axios.get(
                    `${SERVER_URL}/lti/quiz/new_quiz_instance/get/${router.query.id}`,
                    { headers: { Authorization: `Bearer ${router.query.ltik}` } }
                );
                let newQuizInstanceData = newQuizInstance.data.data.new_quiz_instance;
                console.log("useEffect[], new_quiz_instance", newQuizInstanceData);
               
                setNewQuizInstance(newQuizInstanceData);

                try {
                    const settingData = JSON.parse(newQuizInstanceData.additional_info);
                    setSettingData(settingData);
                } catch (error) {
                    console.log("SettingJson Data:", newQuizInstanceData.additional_info);
                    console.log("Parse SettingJson Data error:", error);
                }
                
            } catch (err) {
                console.log('err', err);
            }
        }
        getData();
    }, [router.query.ltik]);

    async function handleStartQuiz() {
        const response = await axios.post(
            `${LOCALHOST}/lti/quiz/${router.query.id}/start`,
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

    async function settingStartQuiz(settingData) {
        try {
            // update setting
            // /new_quiz_instance/update/:new_quiz_instance_id
            const response = await axios.put(
                `${SERVER_URL}/lti/quiz/new_quiz_instance/update/${router.query.id}`,
                {
                    additional_info: JSON.stringify(settingData)
                },
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );

            let newQuizInstanceData = response.data.data.new_quiz_instance;
            console.log("new_quiz_instance", newQuizInstanceData);
            // start quiz
            // /new_quiz/start/
            const response2 = await axios.post(
                `${SERVER_URL}/lti/quiz/new_quiz/start/${newQuizInstanceData.new_quiz_id}`,
                {},
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );
            // redirect to live result
            router.push({
                pathname: `/result`,
                query: {id: `${newQuizInstanceData.new_quiz_id}`, ltik: `${router.query.ltik}`}
            });

        } catch(err) {
            console.log('err', err);
        }
    }

    return (
        <div className="w-screen h-screen">
            <Header />
            {newQuizInstance.name || "Untitled Quiz"}
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
                <SettingLaunch data={settingData} closeModal={handleCloseModal} settingStartQuiz={settingStartQuiz}/>
            ) : (
                ''
            )}
        </div>
    );
}

export default HomePage;
