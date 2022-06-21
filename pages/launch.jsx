import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import SettingLaunch from '../components/modal/SettingLaunch';
import Button from '../components/helpers/Button';
import { QUIZ_STATUS } from 'utils/config';
import WaitingRoom from '../components/launch/WaitingRoom';
import { socket } from '../utils/socket';
import RankingTable from '../components/ranking/RankingTable';
import quizApi from '../apis/quizApi';
import playApi from '../apis/playApi';
import syncApi from '../apis/syncApi';
import _ from 'lodash';
import TopMenu from 'components/config/TopMenu';
import SoundSetup from 'components/helpers/SoundSetup';
import Alert from 'components/helpers/Alert';
import { getRandomOptions } from '../utils/bigheads';
import ToggleSwitch from 'components/helpers/ToggleSwitch';

function HomePage() {
    const router = useRouter();
    // const [isModalVisible, setIsModalVisible] = useState(false);

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

    const [isFinish, setIsFinish] = useState(false);

    const [noti, setNoti] = useState({ msg: '', isError: false });

    const [shuffleAnswerSetting, setShuffleAnswerSetting] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                if (router.query.id == undefined) {
                    const syncLti = await syncApi.syncLti(router.query.ltik);
                    console.log('synclti', syncLti);

                    const newQuizInstance = await quizApi.getQuizInstance(
                        router.query.ltik,
                        syncLti.data.data.instance.id
                    );

                    let newQuizInstanceData =
                        newQuizInstance.data.data.new_quiz_instance;

                    setNewQuizInstance(newQuizInstanceData);

                    if (
                        syncLti.data.data.instance.status == QUIZ_STATUS.PLAYING
                    ) {
                        setIsDisplayRankingTable(true);
                        // getListQuestionAsColumns();

                        // let newQuizInstanceData = response.data.data.new_quiz_instance;
                        console.log('playing', syncLti);
                        teacherJoinInClass(syncLti.data.data.new_quiz.id);

                        const response =
                            await quizApi.getQuizInstanceAndQuestion(
                                router.query.ltik,
                                syncLti.data.data.instance.id
                            );
                        console.log(
                            'quesion list',
                            response.data.data.question_list
                        );

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

                        let data = {
                            username: 'teacher',
                            is_teacher: true
                        };
                        const playerRespone = await playApi.join(
                            router.query.ltik,
                            syncLti.data.data.new_quiz.id,
                            data
                        );
                        console.log('playerresponse', playerRespone.data);

                        const data_arr = Object.keys(
                            playerRespone.data.player
                        ).map((key) => {
                            return {
                                id: key,
                                name: playerRespone.data.player[key]
                            };
                        });

                        setListStudentJoined(data_arr);
                    }

                    router.push(
                        `launch?id=${syncLti.data.data.instance.id}&ltik=${router.query.ltik}`
                    );
                } else {
                    const newQuizInstance = await quizApi.getQuizInstance(
                        router.query.ltik,
                        router.query.id
                    );

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
                        setShuffleAnswerSetting(
                            settingData.shuffleAnswerSetting
                        );
                    } catch (error) {
                        console.log(
                            'SettingJson Data:',
                            newQuizInstanceData.additional_info
                        );
                        console.log('Parse SettingJson Data error:', error);
                    }
                }
            } catch (err) {
                console.log('err', err);
            }
        }
        getData();
    }, [router.query.ltik, router.query.id]);

    function handleOpenModal() {
        settingStartQuiz({ shuffleAnswerSetting });

        // setIsModalVisible(true);
    }

    // function handleCloseModal() {
    //     setIsModalVisible(false);
    // }

    async function teacherJoinInClass(quizId) {
        console.log('teacher join in class');
        let data = {
            username: 'teacher',
            is_teacher: true
        };
        playApi.join(router.query.ltik, quizId, data).then((response) => {
            socket.emit('join', {
                username: 'teacher',
                room: newQuizInstance.socket_id,
                token: response.data.alpha_token
            });
            socket.on('data', (data) => {
                console.log('data student', data);
                if (data.type == 'join') {
                    const data_arr = Object.keys(data.player).map((key) => {
                        return {
                            id: key,
                            name: data.player[key],
                            ava: getRandomOptions()
                        };
                    });

                    console.log('data_arr', data_arr);

                    setListStudentJoined(data_arr);

                    const idStudentArray = Object.keys(data.player).map(
                        (key) => {
                            return {
                                id: Number(key)
                            };
                        }
                    );

                    setAllRowData(idStudentArray);
                }
            });
            socket.on('grade', (data) => {
                console.log('data', data);
                // console.log('grade', data.grade_data)
                if (data.grade_data) {
                    const temp = Object.entries(data.grade_data).map(
                        ([key, value]) =>
                            Object.entries(value).map((student) => ({
                                id: student[0],
                                [key]: student[1]
                            }))
                    );
                    const gradeByNum = [].concat(...temp);
                    const gradeByUser = _.mapValues(
                        _.groupBy(gradeByNum, 'id'),
                        (gradeByNum) => gradeByNum.map((v) => _.omit(v, 'id'))
                    );
                    console.log('>>>', gradeByUser);
                    setTmp(gradeByUser);
                }
            });

            socket.on('rank', (data) => {
                // console.log('rank data', data);
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

            socket.on('end_question', (data) => {
                setIsFinish(true);
                alertMessage('Quiz finished');
            });
        });

        return () => socket.disconnect();
    }

    async function handleStartGame() {
        // start quiz
        // /new_quiz/start/
        const response2 = await quizApi.startQuiz(
            router.query.ltik,
            newQuizInstance.new_quiz_id
        );

        setIsDisplayRankingTable(true);
        getListQuestionAsColumns();
    }

    async function settingStartQuiz(settingData) {
        try {
            // update setting
            // /new_quiz_instance/update/:new_quiz_instance_id
            let data = {
                additional_info: JSON.stringify(settingData)
            };
            let response = await quizApi.updateQuizInstance(
                router.query.ltik,
                router.query.id,
                data
            );

            let newQuizInstanceData = response.data.data.new_quiz_instance;

            await quizApi.waitQuiz(
                router.query.ltik,
                newQuizInstanceData.new_quiz_id
            );

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
            // setIsModalVisible(false);
        } catch (err) {
            console.log('err', err);
        }
    }

    async function getListQuestionAsColumns() {
        const response = await quizApi.getQuizInstanceAndQuestion(
            router.query.ltik,
            newQuizInstance.id
        );
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

    async function handleSaveGrade() {
        if (!isFinish) {
            alertError('Chưa kết thúc bài thi');
        }
        try {
            let response = await quizApi.saveGrade(
                router.query.ltik,
                newQuizInstance.id
            );
            // let newQuizUpdate = response.data.data.newQuiz;

            // let additional_info = JSON.parse(newQuizUpdate.additional_info || '{}');
            // newQuizUpdate = {
            //     ...newQuizUpdate,
            //     ...additional_info,
            // };

            alertMessage('Saved successfully');
        } catch (error) {
            if (error.response) {
                alertError(error.response.data?.message);
            } else {
                alertError(error.message);
            }
        }
    }

    function alertMessage(msg) {
        setNoti({ ...noti, msg });
    }

    function alertError(msg) {
        setNoti({ isError: true, msg });
    }

    return (
        <>
            {noti.msg && (
                <Alert
                    message={noti.msg}
                    isError={noti.isError}
                    hideAlert={() => setNoti({ msg: '', isError: false })}
                />
            )}
            <div className="min-w-screen min-h-screen">
                {/* <Header /> */}
                <div className="flex justify-between px-24 py-6 border-2 items-center sticky top-0 w-full bg-white">
                    <TopMenu goToChooseQuizPage={goToChooseQuizPage} />
                    <SoundSetup />
                </div>
                {!isDisplayRankingTable ? (
                    !isStart ? (
                        <div className="flex flex-col justify-center items-center">
                            <div className=' flex items-center justify-center mt-6 w-full'>
                                <div className='cursor-pointer text-left w-9/12'> Choose quiz / Config time / Start game</div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Image
                                    src="/image/18915856.jpg"
                                    width={400}
                                    height={400}
                                    alt="team"
                                    className="cursor-pointer"
                                />

                                <div className="overflow-x-hidden overflow-y-auto inset-0">
                                    <div className="w-max py-4 m-auto text-2xl font-bold after:block after:w-full after:h-4 text-qpurple after:bg-qpurple-light after:opacity-50 after:-mt-3 after:bg-opacity-60 ">
                                        Cài đặt chế độ hiển thị kết quả
                                    </div>

                                    <div className="flex flex-col gap-4 mb-8">
                                        <div className="flex justify-between items-center">
                                            <p>Xáo trộn câu trả lời</p>
                                            <ToggleSwitch
                                                isToggle={shuffleAnswerSetting}
                                                setIsToggle={
                                                    setShuffleAnswerSetting
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variants="qpurple"
                                    onClick={handleOpenModal}
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
                    <>
                        <div className="flex justify-end mt-8 w-10/12 m-auto">
                            <Button onClick={handleSaveGrade}>
                                Save grade
                            </Button>
                        </div>
                        <RankingTable
                            columns={columns}
                            data={tmp}
                            topStudent={topStudent}
                            listStudentJoined={listStudentJoined}
                            handleSaveGrade={handleSaveGrade}
                        />
                    </>
                )}

                {/* {isModalVisible ? (
                    <SettingLaunch
                        data={settingData}
                        closeModal={handleCloseModal}
                        settingStartQuiz={settingStartQuiz}
                    />
                ) : (
                    ''
                )} */}
            </div>
        </>
    );
}

export default HomePage;
