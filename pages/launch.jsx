import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import SettingLaunch from '../components/modal/SettingLaunch';
import Button from '../components/helpers/Button';
import { LOCALHOST, SERVER_URL } from '../utils/config';
import WaitingRoom from '../components/launch/WaitingRoom';
import { socket } from '../utils/socket';

function HomePage() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // state newQuizInstance
    const [newQuizInstance, setNewQuizInstance] = useState({});

    // state settingData
    const [settingData, setSettingData] = useState({});

    const [isStart, setIsStart] = useState(false);

    const [listStudentJoined, setListStudentJoined] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                if (router.query.id == undefined) return;
                const newQuizInstance = await axios.get(
                    `${SERVER_URL}/lti/quiz/new_quiz_instance/get/${router.query.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${router.query.ltik}`
                        }
                    }
                );
                let newQuizInstanceData =
                    newQuizInstance.data.data.new_quiz_instance;
                console.log(
                    'useEffect[], new_quiz_instance',
                    newQuizInstanceData
                );

                setNewQuizInstance(newQuizInstanceData);

                try {
                    const settingData = JSON.parse(
                        newQuizInstanceData.additional_info
                    );
                    setSettingData(settingData);
                } catch (error) {
                    console.log(
                        'SettingJson Data:',
                        newQuizInstanceData.additional_info
                    );
                    console.log('Parse SettingJson Data error:', error);
                }
            } catch (err) {
                console.log('err', err);
            }
        }
        getData();
    }, [router.query.ltik]);

    useEffect(() => {
        
    }, [listStudentJoined]);

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

    async function teacherJoinInClass(quizId) {
        axios.post(`http://localhost:5000/lti/play/${quizId}/join`, {
            "username": "teacher",
            "is_teacher": true
        },
            { headers: { Authorization: `Bearer ${router.query.ltik}` } })
            .then((response) => {
                console.log('waiting screen');
                socket.emit('join', { username: 'teacher', room: newQuizInstance.socket_id, token: response.data.alpha_token });
            });
        socket.on('data', data => {
            if(!data.is_teacher) {
                setListStudentJoined([...listStudentJoined, data.new_user_join]);
            }
            
        });

        return () => socket.disconnect();
    }

    async function handleStartGame() {
        // start quiz
        // /new_quiz/start/
        const response2 = await axios.post(
            `${SERVER_URL}/lti/quiz/new_quiz/start/${newQuizInstance.new_quiz_id}`,
            {},
            { headers: { Authorization: `Bearer ${router.query.ltik}` } }
        );

        // redirect to live result
        router.push({
            pathname: `/result`,
            query: {id: `${newQuizInstance.new_quiz_id}`, ltik: `${router.query.ltik}`}
        });

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
            teacherJoinInClass(newQuizInstanceData.id);
            setNewQuizInstance(newQuizInstanceData);
            

            // update quiz, pending until student join or when teacher want to start
            // /new_quiz/update/
            const response3 = await axios.put(
                `${SERVER_URL}/lti/quiz/new_quiz_instance/update/${newQuizInstanceData.new_quiz_id}`,
                {
                    status: "pending"
                },
                { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            );
            setNewQuizInstance(response3.data.data.new_quiz_instance);

            setIsStart(true);
            setIsModalVisible(false);
            
        } catch (err) {
            console.log('err', err);
        }
    }

    return (
        <div className="w-screen h-screen">
            <Header />
            {/* {newQuizInstance.name || "Untitled Quiz"} */}
            {!isStart ? (
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
                        <Button
                            type="button"
                            variants="primary"
                            className="w-32"
                        >
                            Start quiz
                        </Button>
                    </div>
                </div>
            ) : (
                
                <WaitingRoom listStudentJoined={listStudentJoined} startGameFn={handleStartGame}/>
                
                
            )}
            {isModalVisible ? (
                <SettingLaunch
                    data={settingData}
                    closeModal={handleCloseModal}
                    settingStartQuiz={settingStartQuiz}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default HomePage;
