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
import RankingTable from '../components/ranking/RankingTable';
import quizApi from '../apis/quizApi';
import playApi from '../apis/playApi';

function HomePage() {
    const router = useRouter();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // state newQuizInstance
    const [newQuizInstance, setNewQuizInstance] = useState({});

    // state settingData
    const [settingData, setSettingData] = useState({});

    const [isStart, setIsStart] = useState(false);

    const [listStudentJoined, setListStudentJoined] = useState([]);

    const [isDisplayRankingTable, setIsDisplayRankingTable] = useState(false);

    const [columns, setColumns] = useState([]);

    const [allRowData, setAllRowData] = useState({});

    useEffect(() => {
        async function getData() {
            try {
                if (router.query.id == undefined) return;
                const newQuizInstance = await quizApi.getQuizInstance(router.query.ltik, router.query.id);

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

    function handleOpenModal() {
        setIsModalVisible(true);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
    }

    async function teacherJoinInClass(quizId) {
        let data = {
            username: 'teacher',
            is_teacher: true
        };
        playApi.join(router.query.ltik, quizId, data)
        .then((response) => {
            socket.emit('join', {
                username: 'teacher',
                room: newQuizInstance.socket_id,
                token: response.data.alpha_token
            });
        });
        socket.on('data', (data) => {
            console.log('data', data);
            if (data.is_teacher != null && data.is_teacher == false) {
                console.log("data is teacher")
                const newStudentName = data.new_user_join;
                const newStudentId = data.platform_user_id;
                const obj = { name: newStudentName, id: newStudentId };
                
                setListStudentJoined([...listStudentJoined, obj]);
            }

            if(data.teacher_data){
                console.log("teacher data")
                setAllRowData(data.teacher_data);
            }
        });

        return () => socket.disconnect();
    }
    console.log('liststudentjoined', listStudentJoined);

    async function handleStartGame() {
        // start quiz
        // /new_quiz/start/
        const response2 = await quizApi.startQuiz(router.query.ltik, newQuizInstance.new_quiz_id);

        setIsDisplayRankingTable(true);
        getListQuestionAsColumns();
        // redirect to live result
        // router.push({
        //     pathname: `/result`,
        //     query: {id: `${newQuizInstance.new_quiz_id}`, ltik: `${router.query.ltik}`}
        // });
    }

    async function settingStartQuiz(settingData) {
        try {
            // update setting
            // /new_quiz_instance/update/:new_quiz_instance_id
            let data = {
                additional_info: JSON.stringify(settingData),
                status: 'pending'
            };
            const response = await quizApi.updateQuizInstance(router.query.ltik, router.query.id, data);

            let newQuizInstanceData = response.data.data.new_quiz_instance;
            teacherJoinInClass(newQuizInstanceData.id);
            setNewQuizInstance(newQuizInstanceData);

            // update quiz, pending until student join or when teacher want to start
            // /new_quiz/update/
            // const response3 = await axios.put(
            //     `${SERVER_URL}/lti/quiz/new_quiz_instance/update/${newQuizInstanceData.new_quiz_id}`,
            //     {
            //         status: 'pending'
            //     },
            //     { headers: { Authorization: `Bearer ${router.query.ltik}` } }
            // );
            // setNewQuizInstance(response3.data.data.new_quiz_instance);

            setIsStart(true);
            setIsModalVisible(false);
        } catch (err) {
            console.log('err', err);
        }
    }

    async function getListQuestionAsColumns() {
        const response = await quizApi.getQuizInstanceAndQuestion(router.query.ltik, newQuizInstance.id);

        const tmpColumns = response.data.data.question_list.map(
            (question, index) => {
                const obj = Object.create({});
                obj['header'] = `Câu hỏi ${index + 1}`;
                obj['accessor'] = question.id;
                return obj;
            }
        );
        tmpColumns.unshift({
            header: 'Tên',
            accessor: 'name'
        });
        
        setColumns(tmpColumns);
    }

    return (
        <div className="w-screen h-screen">
            <Header />
            {/* {newQuizInstance.name || "Untitled Quiz"} */}
            {!isDisplayRankingTable ? (
                !isStart ? (
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
                    <WaitingRoom
                        listStudentJoined={listStudentJoined}
                        startGameFn={handleStartGame}
                    />
                )
            ) : (
                <RankingTable columns={columns} data={allRowData} listStudentJoined={listStudentJoined} />
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

// const data = [
//     {name: "chloe", score1: 10, score2: 20},
//     {name: "chloe", score1: 10, score2: 20},
//     {name: "chloe", score1: 10, score2: 20}
// ];

const data = [
    [20, 10, 30],
    [20, 10, 30],
    [20, 10, 30]
];
