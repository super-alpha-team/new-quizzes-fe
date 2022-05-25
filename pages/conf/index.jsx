import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useRouter } from 'next/router';
import SingleQuiz from '../../components/config/SingleQuiz';
import { SERVER_URL, QUIZ_STATUS } from '../../utils/config';
import Button from '../../components/helpers/Button';
import syncApi from '../../apis/syncApi';
import quizApi from '../../apis/quizApi';

function ChooseQuiz() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const [listQuiz, setListQuiz] = useState([]);
    const [isHavingInstance, setIsHavingInstance] = useState(false);
    const [listInstance, setListInstance] = useState([]);
    const [quizId, setQuizId] = useState(-1);
    const router = useRouter();

    useEffect(() => {
        const getAllQuizzes = async () => {
            const checkNewQuiz = await syncApi.syncLti(router.query.ltik);
            console.log('check new quiz', checkNewQuiz);

            let checkNewQuizResp = checkNewQuiz.data.data;
            console.log(']> check newQuiz: ', checkNewQuizResp);

            let newQuiz = checkNewQuizResp.new_quiz;
            let newQuizInstance = checkNewQuizResp.instance;

            // console.log('new quiz', newQuiz);

            if (newQuiz) {
                // console.log('new quiz', newQuiz);
                setIsHavingInstance(true);
                // check instance Status
                // if status == active -> redirect to launcher game
                if (
                    newQuizInstance.status === QUIZ_STATUS.PENDING ||
                    newQuizInstance.status === QUIZ_STATUS.PLAYING
                ) {
                    // TODO
                    // router.push(`/game?instance_id=${newQuizInstanceId}`);
                }
                // else to config page
                const newQuizInstanceId = newQuiz.new_quiz_instance_active_id;
                // return router.push(`/conf/${new5QuizInstanceId}?ltik=${router.query.ltik}`);
                // console.log('new quiz id', newQuiz.id);

                setQuizId(newQuiz.id);

                const listQuizInstance = await quizApi.listQuizInstance(
                    router.query.ltik,
                    newQuiz.id
                );
                // console.log('listquizindtance', listQuizInstance.data.data);
                setListInstance(
                    listQuizInstance.data.data.new_quiz_instance_list
                );
            }

            const listMooodleQuiz = await quizApi.getListMoodleQuiz(
                router.query.ltik
            );
            const listMooodleQuizData = listMooodleQuiz.data.data;
            console.log(']> get list moodle quiz: ', listMooodleQuizData);

            // listMooodleQuizData
            setListQuiz(listMooodleQuizData.quiz_list);
        };
        if (router.query.ltik) {
            getAllQuizzes();
        }
    }, [router.query.ltik]);

    console.log('listinstance', listInstance);

    const goToListQuestions = async () => {
        const dataSend = {
            quiz_id: isChoosing,
            name: 'test name',
            additional_info: ''
        };
        const chooseQuiz = await quizApi.chooseQuiz(
            router.query.ltik,
            dataSend
        );
        const chooseQuizData = chooseQuiz.data.data;
        console.log(']> lti/quiz/choose: ', chooseQuizData);
        const dataResponse = chooseQuizData.instance;
        router.push(`/conf/${dataResponse.id}?ltik=${router.query.ltik}`);
    };

    const handleCreateNewInstance = async () => {
        const createInstanceApi = await quizApi.createInstance(router.query.ltik, "new quiz instance", quizId);
        return router.push(`/conf/${createInstanceApi.data.data.new_quiz_instance.id}?ltik=${router.query.ltik}`);
        // console.log("createInstanceApi", createInstanceApi);
    };

    const handleContinueConfigTime = (id) => {
        router.push(`/conf/${id}?ltik=${router.query.ltik}`);
    };

    console.log('list quiz', listQuiz);

    return (
        <>
            <div className="w-screen h-screen bg-background-mid">
                <Header />

            {isHavingInstance ? (
                <div className="w-9/12 m-auto pt-4 pb-4">
                    <p className="text-xl font-bold mb-4">
                        {' '}
                        Các bộ câu hỏi được tạo trước đây{' '}
                    </p>
                    <hr className="mb-8 mt-2" />
                    {listInstance.map((instance, index) => (
                        <div
                            key={index}
                            className="flex justify-between text-lg items-center"
                        >
                            <p>{instance.name}</p>
                            <p>Trạng thái: {instance.status}</p>
                            {instance.status == 'editing' ? (
                                <Button onClick={() => handleContinueConfigTime(instance.id)}>Tiếp tục chỉnh sửaa</Button>
                            ) : instance.status == 'pending' ? (
                                <Button>Chơi ngay</Button>
                            ) : (
                                <Button>Xem kết quả</Button>
                            )}
                        </div>
                    ))}
                    <hr className="mb-8 mt-8" />
                    <p>Chơi ngay nếu có bộ câu hỏi đã được cài đặt </p>
                    <p>Hoặc</p>
                    <p>Tạo bộ câu hỏi mới ở đây </p>
                    <Button onClick={handleCreateNewInstance}>Tạo mới</Button>
                </div>
            ) : (
                <>
                    <p className="w-9/12 m-auto pt-4 pb-4 text-xl font-bold">Chọn bộ câu hỏi</p>
                <div className="w-9/12 m-auto h-[70%] border-[#ECECEC] border-2 shadow-quiz rounded-2xl bg-white">
                    <div className="h-[100%] flex flex-col pt-8 pb-4 overflow-hidden overflow-y-scroll">
                        {listQuiz.map((quizInfo, index) => (
                            <SingleQuiz
                                id={quizInfo.id}
                                key={quizInfo.id}
                                isChoosing={isChoosing}
                                setIsChoosing={setIsChoosing}
                                title={quizInfo.name}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-9/12 m-auto justify-end flex mt-8 ">
                    {isChoosing != -1 ? (
                        <Button
                            type="button"
                            variants="primary"
                            onClick={goToListQuestions}
                            className="w-32"
                        >
                            Tiếp tục
                        </Button>
                    ) : (
                        <div className="bg-gray-300 text-white font-bold py-2 px-4 rounded duration-300 w-32 flex justify-center">
                            Tiếp tục
                        </div>
                    )}
                </div>

                    
        </>
            )}
        </div>
        </>
    );
}

export default ChooseQuiz;
