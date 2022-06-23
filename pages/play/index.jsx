import syncApi from 'apis/syncApi';
import History from 'components/launch/History';
import NotStartedQuiz from 'components/launch/NotStartedQuiz';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QUIZ_STATUS } from 'utils/config';
import Play from '../../components/playing/Play';

export default function PlayGame() {
  const router = useRouter();
  const [username, setUsername] = useState('Chloe');
  const [history, setHistory] = useState(null);
  const [maxGrade, setMaxGrade] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);

  const [userId, setUserId] = useState(null);
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
        setHistory(info.data?.data?.submission_data);
        setTotalQuestion(info.data?.data?.new_quiz?.new_quiz_instance?.question_count);
        setMaxGrade(info.data?.data?.new_quiz?.new_quiz_instance?.sum_grade);
        setUserId(info.data?.data?.new_user?.id);
        setUsername(info.data?.data?.user_info?.name);

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
      <Play quizId={quizInstance.quizId} room_id={quizInstance.roomId} userId={userId} username={username} quizName={quizInstance.quizName} totalQuestion={totalQuestion} />
      : <History token={router.query.ltik} history={history} quizId={quizInstance.quizId} maxGrade={maxGrade} username={username} />;

}
