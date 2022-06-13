import syncApi from 'apis/syncApi';
import DoneQuiz from 'components/launch/DoneQuiz';
import InputUsername from 'components/launch/InputUsername';
import NotStartedQuiz from 'components/launch/NotStartedQuiz';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { QUIZ_STATUS } from 'utils/config';
import Loading from '../../components/launch/Loading';
import Play from '../../components/playing/Play';

export default function PlayGame() {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  const [platformUserId, setPlatformUserId] = useState(null);
  const [quizInstance, setQuizInstance] = useState({
    quizId: null,
    quizName: null,
    roomId: null,
    status: null,
  });

  useEffect(() => {
    const syncLti = async () => {
      const response = await syncApi.syncLti(router.query.ltik);
      let responsedData = response.data.data;
      const quizId = responsedData.new_quiz?.id;

      let newQuizInstance = responsedData.instance;

      if (newQuizInstance) {
        const { socket_id, status, name } = newQuizInstance;

        let info = await syncApi.syncInfo(router.query.ltik);
        console.log('info>>>', info, newQuizInstance);
        setPlatformUserId(info.data?.data?.platform_user_id);

        setQuizInstance({
          quizId,
          quizName: name,
          roomId: socket_id,
          status,
        });
      }
    };

    if (router.query.ltik) {
      syncLti();
    }

  }, [router.query.ltik]);

  return !quizInstance.status ? <NotStartedQuiz />
    : quizInstance.status != QUIZ_STATUS.DONE ?
      (username ? <Play quizId={quizInstance.quizId} room_id={quizInstance.roomId} platformUserId={platformUserId} username={username} quizName={quizInstance.quizName} /> : <InputUsername usernameOnSubmit={setUsername} quizName={quizInstance.quizName} />)
      : <DoneQuiz />;

}
