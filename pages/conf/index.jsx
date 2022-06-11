import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import Header from 'components/Header';
import SingleQuiz from 'components/config/SingleQuiz';
import Popover from 'components/helpers/Popover';
import NameModal from 'components/config/NameModal';

import { QUIZ_STATUS } from 'utils/config';
import Button from 'components/helpers/Button';
import syncApi from 'apis/syncApi';
import quizApi from 'apis/quizApi';

function ChooseQuiz() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const [listQuiz, setListQuiz] = useState([]);
    const [isHavingInstance, setIsHavingInstance] = useState(false);
    const [listInstance, setListInstance] = useState([]);
    const [newQuiz, setQuiz] = useState(null);
    const router = useRouter();

    const [instanceStatus, setInstanceStatus] = useState(null);

    useEffect(() => {
        const getAllQuizzes = async () => {
            const checkNewQuiz = await syncApi.syncLti(router.query.ltik);

            let checkNewQuizResp = checkNewQuiz.data.data;

            let newQuiz = checkNewQuizResp.new_quiz;
            let newQuizInstance = checkNewQuizResp.instance;

            if (newQuiz && newQuizInstance) { // new quiz had creatd
                setIsHavingInstance(true);
                setInstanceStatus(newQuizInstance.status);

                if (newQuizInstance.status === QUIZ_STATUS.PENDING || newQuizInstance.status === QUIZ_STATUS.PLAYING) {
                    router.push(`/launch?ltik=${router.query.ltik}`)
                }

                setQuiz(newQuiz);

                const listQuizInstance = await quizApi.listQuizInstance(
                    router.query.ltik,
                    newQuiz.id
                );
                setListInstance(
                    listQuizInstance.data.data.new_quiz_instance_list
                );
            } else {
                const listMooodleQuiz = await quizApi.getListMoodleQuiz(
                    router.query.ltik
                );
                const listMooodleQuizData = listMooodleQuiz.data.data;
                setListQuiz(listMooodleQuizData.quiz_list);
            }
        };
        if (router.query.ltik) {
            getAllQuizzes();
        }
    }, [router.query.ltik]);

    async function nameClickCallback(name = "UnName") {
        const dataSend = {
            quiz_id: isChoosing,
            name,
            additional_info: ''
        };
        const chooseQuiz = await quizApi.chooseQuiz(
            router.query.ltik,
            dataSend
        );
        const chooseQuizData = chooseQuiz.data.data;
        const dataResponse = chooseQuizData.instance;
        console.log('nameClickCallback')
        router.push(`/conf/${dataResponse.id}?ltik=${router.query.ltik}`);
    }

    async function newInstanceClickCallback(name = "UnName") {
        console.log('create button', createInstanceApi.data.data.new_quiz_instance.id);
        console.log('ltk', router.query.ltik);

        const createInstanceApi = await quizApi.createInstance(router.query.ltik, name, newQuiz.id);
        return router.push(`/conf/${createInstanceApi.data.data.new_quiz_instance.id}?ltik=${router.query.ltik}`);
    };

    const handleContinueConfigTime = (id) => {
        console.log('handleContinueConfigTime ', id)
        router.push(`/conf/${id}?ltik=${router.query.ltik}`);
    };

    async function handleDownloadExport(id, name) {
        await quizApi.downloadExportData(router.query.ltik, id, name);
    }

    const chooseQuiz = useRef(null);
    const toggleNameModal = () => chooseQuiz.current.toggleVisibility();

    const newInstance = useRef(null);
    const toggleNameInstanceModal = () => newInstance.current.toggleVisibility();

    console.log('list', listInstance.reverse())

    return (
        <>
            <Popover ref={chooseQuiz}>
                <NameModal
                    nameClickCallback={nameClickCallback}
                    closeFn={toggleNameModal}
                />
            </Popover>
            <Popover ref={newInstance}>
                <NameModal
                    nameClickCallback={newInstanceClickCallback}
                    closeFn={toggleNameInstanceModal}
                />
            </Popover>
            <div className="bg-background-mid pt-4">
                {/* <Header /> */}
                {
                    isHavingInstance == false && (
                        <>
                            <p className="w-9/12 m-auto text-xl font-bold">Chọn bộ câu hỏi</p>
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
                                        onClick={toggleNameModal}
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
                    )
                }

                {
                    isHavingInstance == true && (
                        <>
                            {
                                (instanceStatus === QUIZ_STATUS.EDITING || instanceStatus === QUIZ_STATUS.DONE) && (
                                    <>
                                        <div className="w-8/12 m-auto pt-4 pb-4 pb-16">
                                            <p className="text-xl font-bold mb-4">
                                                Các bộ câu hỏi được tạo trước đây
                                            </p>
                                            <hr className="mb-8 mt-2" />

                                        
                                            <p>Chơi ngay nếu có bộ câu hỏi đã được cài đặt </p>
                                            <p>Hoặc</p>
                                            <p>Tạo bộ câu hỏi mới ở đây </p>
                                            <Button
                                                className="w-40 text-base mt-2"
                                                onClick={toggleNameInstanceModal}>
                                                     Tạo mới
                                            </Button>

                                            <hr className="mb-8 mt-8" />

                                            {listInstance.sort((a, b) => parseInt(b.id) - parseInt(a.id))
                                            .map((instance, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between text-lg items-center h-32 overflow-hidden pl-8 bg-white m-auto w-full mb-2"
                                                >
                                                    <p>{instance.name}
                                                        {
                                                            instance.id == newQuiz.new_quiz_instance_active_id && (
                                                                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">Active</span>
                                                            )
                                                        }
                                                    </p>
                                                    {/* <p>Trạng thái: {instance.status}</p> */}

                                                    <div className="flex flex-col items-end h-full justify-between py-2 px-2">
                                                    {instance.status == QUIZ_STATUS.DONE && (
                                                            <span className="ml-2 bg-blue-0 italic text-blue-800 text-base font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">#Done</span>
                                                        )}

                                                        {instance.status == QUIZ_STATUS.EDITING && (
                                                            <span className="ml-2 bg-red-00 italic text-blue-800 text-base font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800">#Editing</span>
                                                        )}

                                                        {
                                                            instance.status == QUIZ_STATUS.EDITING && (
                                                                <Button 
                                                                    className="text-sm min-w-40"

                                                                    onClick={() => handleContinueConfigTime(instance.id)}>
                                                                        Tiếp tục chỉnh sửa
                                                                </Button>
                                                            )
                                                        }
                                                        {
                                                            instance.status == QUIZ_STATUS.DONE && (
                                                                <Button 
                                                                    className="text-sm w-40"
                                                                    variants="secondary"
                                                                    onClick={() => handleDownloadExport(instance.id, instance.name)}>
                                                                        Tải dữ liệu chơi
                                                                </Button>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                    
                                                </div>
                                            ))}
                                            
                                        </div>
                                    </>
                                )
                            }
                            {/* {
                                (instanceStatus === QUIZ_STATUS.PENDING || instanceStatus === QUIZ_STATUS.PLAYING) && (
                                    <div className='w-9/12 m-auto pt-4 pb-4'>
                                        <h1>Game is playing, please go back in soon</h1>
                                    </div>
                                )
                            } */}
                        </>
                    )
                }
            </div>
        </>
    );
}

export default ChooseQuiz;
