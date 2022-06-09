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
import _ from 'lodash'
import TopMenu from 'components/config/TopMenu';

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

    const [allRowData, setAllRowData] = useState([]);

    const [tmp, setTmp] = useState({});

    const [topStudent, setTopStudent] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                if (router.query.id == undefined) return;
                const newQuizInstance = await quizApi.getQuizInstance(router.query.ltik, router.query.id);

                let newQuizInstanceData =
                    newQuizInstance.data.data.new_quiz_instance;
                // console.log(
                //     'useEffect[], new_quiz_instance',
                //     newQuizInstanceData
                // );

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
        // console.log('teacher join in class');
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
            socket.on('data', (data) => {
                // console.log('data', data);
                if (data.type == 'join') {
                    const data_arr = Object.keys(data.player).map((key) => {
                        return {
                            id: key,
                            name: data.player[key]
                        }
                    });
                    
                    setListStudentJoined(data_arr);

                    const idStudentArray = Object.keys(data.player).map((key) => {
                        return {
                            id: Number(key)
                        }
                    })

                    setAllRowData(idStudentArray)

                }
            });
            socket.on('grade', (data) => {
                // console.log('data', data);
                // console.log('grade', data.grade_data)
                if(data.grade_data){
                    const temp = Object.entries(data.grade_data).map(([key, value]) => (Object.entries(value).map((student) => ({id: student[0], [key]: student[1]}))));
                    const gradeByNum = [].concat(...temp);
                    const gradeByUser = _.mapValues(_.groupBy(gradeByNum, 'id'),
                    gradeByNum => gradeByNum.map(v => _.omit(v, 'id')));
                    console.log('>>>',gradeByUser);
                    setTmp(gradeByUser);
                }
            });

            socket.on('rank', (data) => {
                console.log('rank data', data);
                let rank_list = data?.rank_list || [];
                let rank_list_obj = {};
                rank_list.forEach((item) => {
                    if (item.rank == 1) {
                        rank_list_obj['1'] = item;
                    }
                    if (item.rank == 2) {
                        rank_list_obj['2'] = item;
                    }
                    if (item.rank == 3) {
                        rank_list_obj['3'] = item;
                    }
                });
                setTopStudent(rank_list_obj);
            });
        });
        
        
        return () => socket.disconnect();
    }

    async function handleStartGame() {
        // start quiz
        // /new_quiz/start/
        const response2 = await quizApi.startQuiz(router.query.ltik, newQuizInstance.new_quiz_id);

        setIsDisplayRankingTable(true);
        getListQuestionAsColumns();
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
            teacherJoinInClass(newQuizInstanceData.new_quiz_id);
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
        // console.log('quesion list',response.data.data.question_list)

        const tmpColumns = response.data.data.question_list.map(
            (question, index) => {
                const obj = Object.create({});
                obj['header'] = `Câu hỏi ${index + 1}`;
                obj['id'] = index;
                return obj;
            }
        );
        tmpColumns.unshift({
            header: 'Tên',
            id: 'name'
        });
        
        setColumns(tmpColumns);
    }

    function goToChooseQuizPage() {
        router.push(`/conf?ltik=${router.query.ltik}`);
    }

    return (
        <div className="w-screen h-screen">
            {/* <Header /> */}
            <TopMenu goToChooseQuizPage={goToChooseQuizPage} />
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
                <RankingTable columns={columns} data={tmp} topStudent={topStudent} listStudentJoined={listStudentJoined} />
                // <RankingTable columns={column} data={allRowData} listStudentJoined={lst} />
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
