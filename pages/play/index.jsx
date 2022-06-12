/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-script-in-head */
/* eslint-disable @next/next/no-unwanted-polyfillio */
import { data } from 'autoprefixer';
import axios from 'axios';
import DoneQuiz from 'components/launch/DoneQuiz';
import InputUsername from 'components/launch/InputUsername';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/launch/Loading';
import Play from '../../components/playing/Play';
import { LOCALHOST } from '../../utils/config';

const QuizStatusEnum = {
  EDITING: 'editing',
  PENDING: 'pending',
  PLAYING: 'playing',
  DONE: 'done',
  array: ['editing', 'pending', 'playing', 'done']
};

export default function PlayGame() {
  const router = useRouter();

  // state for game
  const [game, setGame] = useState(null);
  // state for room_id
  const [room_id, setRoomId] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [platformUserId, setPlatformUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [quizName, setQuizName] = useState(null);

  useEffect(() => {
    const syncLti = async () => {

      const checkNewQuiz = await axios.get(
        `${LOCALHOST}/lti/sync/lti`,
        { headers: { Authorization: `Bearer ${router.query.ltik}` } }
      );
      let checkNewQuizResp = checkNewQuiz.data.data;
      // console.log("]> check newQuiz: ", checkNewQuizResp);

      let newQuizInstance = checkNewQuizResp.instance;
      setQuizName(newQuizInstance.name);

      if (newQuizInstance) {
        setQuizId(checkNewQuizResp.new_quiz.id);
        const { socket_id, status } = newQuizInstance;

        if (status == QuizStatusEnum.PLAYING || status === QuizStatusEnum.PENDING) {
          setRoomId(socket_id);
          setGame('play');
        }
        if (status == QuizStatusEnum.DONE) {
          setGame('done');
        }

        const info = await axios.get(
          `${LOCALHOST}/lti/sync/info`,
          { headers: { Authorization: `Bearer ${router.query.ltik}` } }
        );

        setPlatformUserId(info.data?.data?.platform_user_id);
      }
    };

    if (router.query.ltik) {
      syncLti();
    }

  }, [router.query.ltik]);

  return game != "done" ?
    (username ? <Play quizId={quizId} room_id={room_id} platformUserId={platformUserId} username={username} quizName={quizName} /> : <InputUsername usernameOnSubmit={setUsername} quizName={quizName} />)
    : <DoneQuiz />;

}
