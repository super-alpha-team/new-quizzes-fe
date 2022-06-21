import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import NameModal from 'components/config/NameModal';
import SingleQuiz from 'components/config/SingleQuiz';
import Popover from 'components/helpers/Popover';

import quizApi from 'apis/quizApi';
import syncApi from 'apis/syncApi';
import Alert from 'components/helpers/Alert';
import Button from 'components/helpers/Button';
import { QUIZ_STATUS } from 'utils/config';
import PlatformHeader from 'components/app/platform/PlatformHeader';
import Breadcrumb from 'components/helpers/Breadcrumb';
import TopMenu from 'components/config/TopMenu';

function ChooseQuiz() {
    const [isChoosing, setIsChoosing] = useState(-1);
    const [listQuiz, setListQuiz] = useState([]);
    const [isHavingInstance, setIsHavingInstance] = useState(false);
    const [listInstance, setListInstance] = useState([]);
    const [newQuiz, setQuiz] = useState(null);
    const router = useRouter();

    const [instanceStatus, setInstanceStatus] = useState(null);
    const [noti, setNoti] = useState({ msg: '', isError: false });

    useEffect(() => {
        const getAllQuizzes = async () => {
            const checkNewQuiz = await syncApi.syncLti(router.query.ltik);

            let checkNewQuizResp = checkNewQuiz.data.data;

            let newQuiz = checkNewQuizResp.new_quiz;
            let newQuizInstance = checkNewQuizResp.instance;

            if (newQuiz && newQuizInstance) {
                // new quiz had creatd
                setIsHavingInstance(true);
                setInstanceStatus(newQuizInstance.status);

                if (
                    newQuizInstance.status === QUIZ_STATUS.PENDING ||
                    newQuizInstance.status === QUIZ_STATUS.PLAYING
                ) {
                    router.push(`/launch?ltik=${router.query.ltik}`);
                }

                let additional_info = JSON.parse(
                    newQuiz.additional_info || '{}'
                );

                newQuiz = {
                    ...newQuiz,
                    ...additional_info
                };

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

    async function nameClickCallback(name = 'UnName') {
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
        router.push(`/conf/${dataResponse.id}?ltik=${router.query.ltik}`);
    }

    async function newInstanceClickCallback(name = 'UnName') {
        const createInstanceApi = await quizApi.createInstance(
            router.query.ltik,
            name,
            newQuiz.id
        );
        return router.push(
            `/conf/${createInstanceApi.data.data.new_quiz_instance.id}?ltik=${router.query.ltik}`
        );
    }

    const handleContinueConfigTime = (id) => {
        router.push(`/conf/${id}?ltik=${router.query.ltik}`);
    };

    async function handleDownloadExport(id, name) {
        await quizApi.downloadExportData(router.query.ltik, id, name);
    }

    async function handleSaveGrade(id) {
        try {
            let response = await quizApi.saveGrade(router.query.ltik, id);
            let newQuizUpdate = response.data.data.newQuiz;

            let additional_info = JSON.parse(
                newQuizUpdate.additional_info || '{}'
            );
            newQuizUpdate = {
                ...newQuizUpdate,
                ...additional_info
            };

            setQuiz(newQuizUpdate);

            const listQuizInstance = await quizApi.listQuizInstance(
                router.query.ltik,
                newQuiz.id
            );
            setListInstance(listQuizInstance.data.data.new_quiz_instance_list);
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

    const chooseQuiz = useRef(null);
    const toggleNameModal = () => chooseQuiz.current.toggleVisibility();

    const newInstance = useRef(null);
    const toggleNameInstanceModal = () =>
        newInstance.current.toggleVisibility();

    return (
        <>
            {noti.msg && (
                <Alert
                    message={noti.msg}
                    isError={noti.isError}
                    hideAlert={() => setNoti({ msg: '', isError: false })}
                />
            )}
            <div className="bg-background-mid min-w-screen min-h-screen w-full h-full">
                <PlatformHeader />
                <Popover ref={chooseQuiz}>
                    <NameModal
                        nameClickCallback={nameClickCallback}
                        closeFn={toggleNameModal}
                        title={`New Quizzes' Name`}
                    />
                </Popover>
                <Popover ref={newInstance}>
                    <NameModal
                        nameClickCallback={newInstanceClickCallback}
                        closeFn={toggleNameInstanceModal}
                        title={`New Quizzes' Name`}
                    />
                </Popover>
                <div className='flex items-center justify-center pt-16 ml-12'>
                    <Breadcrumb token={router.query.ltik} actions={['Manage instances']} />
                </div>
                {isHavingInstance == false && (
                    <>
                        <div className='flex items-center justify-center mt-4'>
                            <Breadcrumb token={router.query.ltik} actions={['Choose quiz']} />
                        </div>
                        <div className="w-max  m-auto pt-20 pb-2 text-2xl font-bold after:block after:w-full after:h-4 text-qpurple after:bg-qpurple-light after:opacity-50 after:-mt-3 after:bg-opacity-60 ">
                            Choose your quiz
                        </div>
                        <p className='cursor-pointer text-center'> Choose the quiz that you want your student to play</p>
                        <div className=' flex items-center justify-center mt-4'>
                            {/* <div className='cursor-pointer text-left w-9/12'> Choose quiz / </div> */}
                            <Breadcrumb token={router.query.ltik} actions={['Choose quiz']} />

                        </div>


                        <div className="w-9/12 m-auto mt-2 h-[70vh] border-[#ECECEC] border-2 shadow-quiz rounded-2xl bg-white">
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
                        <div className="w-9/12 py-8 m-auto justify-end flex">
                            {isChoosing != -1 ? (
                                <Button
                                    type="button"
                                    variants="qpurple"
                                    onClick={toggleNameModal}
                                    className="w-32"
                                >
                                    Continue
                                </Button>
                            ) : (
                                <div className="bg-gray-300 text-white font-bold py-2 px-4 rounded duration-300 w-32 flex justify-center">
                                    Continue
                                </div>
                            )}
                        </div>
                    </>
                )}

                {isHavingInstance == true && (
                    <>
                        {(instanceStatus === QUIZ_STATUS.EDITING ||
                            instanceStatus === QUIZ_STATUS.DONE) && (
                                <>
                                    <div className="w-8/12 m-auto py-4">
                                        {/* <hr className="my-2" />

                                    <p>
                                        Play now if your quiz has already
                                        created{' '}
                                    </p>
                                    <p>Or</p>
                                    <p>Create new!!!</p> */}
                                        <div className='flex justify-between items-end pb-4'>
                                            <p className="text-xl font-bold">
                                                Latest instances
                                            </p>
                                            <Button
                                                className="w-max text-base"
                                                variants="qpurple"
                                                onClick={toggleNameInstanceModal}
                                            >
                                                Create new
                                            </Button>
                                        </div>

                                        {/* <hr className="mb-8 " /> */}

                                        {listInstance
                                            .sort(
                                                (a, b) =>
                                                    parseInt(b.id) - parseInt(a.id)
                                            )
                                            .map((instance, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between text-lg items-center h-32 overflow-hidden pl-8 bg-white m-auto w-full mb-2"
                                                >
                                                    <p>
                                                        {instance.name}
                                                        {instance.id ==
                                                            newQuiz.new_quiz_instance_active_id && (
                                                                <span className="ml-2 bg-green-100 text-qgreen-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                                                    Active
                                                                </span>
                                                            )}
                                                        {instance.id ==
                                                            newQuiz.saved_grade_for_instance && (
                                                                <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
                                                                    Saved grade
                                                                </span>
                                                            )}
                                                    </p>
                                                    {/* <p>Trạng thái: {instance.status}</p> */}

                                                    <div className="flex flex-col items-end h-full justify-between py-2 px-2">
                                                        {instance.status ==
                                                            QUIZ_STATUS.DONE && (
                                                                <span className="ml-2 bg-blue-0 italic text-qgreen-dark text-base font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                                                    #Done
                                                                </span>
                                                            )}

                                                        {instance.status ==
                                                            QUIZ_STATUS.EDITING && (
                                                                <span className="ml-2 bg-red-00 italic text-qgreen-dark text-base font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800">
                                                                    #Editing
                                                                </span>
                                                            )}

                                                        {instance.status ==
                                                            QUIZ_STATUS.EDITING && (
                                                                <Button
                                                                    className="text-sm min-w-40"
                                                                    onClick={() =>
                                                                        handleContinueConfigTime(
                                                                            instance.id
                                                                        )
                                                                    }
                                                                    variants="qgreen"
                                                                >
                                                                    Continue editing
                                                                </Button>
                                                            )}
                                                        {instance.status ==
                                                            QUIZ_STATUS.DONE && (
                                                                <div className=" flex flex-row gap-2">
                                                                    <Button
                                                                        className="text-sm w-max"
                                                                        variants="secondary"
                                                                        onClick={() =>
                                                                            handleSaveGrade(
                                                                                instance.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Save grade
                                                                    </Button>
                                                                    <Button
                                                                        className="text-sm w-max"
                                                                        variants="secondary"
                                                                        onClick={() =>
                                                                            handleDownloadExport(
                                                                                instance.id,
                                                                                instance.name
                                                                            )
                                                                        }
                                                                    >
                                                                        Download play
                                                                        data
                                                                    </Button>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        {/* {
                                (instanceStatus === QUIZ_STATUS.PENDING || instanceStatus === QUIZ_STATUS.PLAYING) && (
                                    <div className='w-9/12 m-auto pt-4 pb-4'>
                                        <h1>Game is playing, please go back in soon</h1>
                                    </div>
                                )
                            } */}
                    </>
                )}
            </div>
        </>
    );
}

export default ChooseQuiz;
