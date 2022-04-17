import { data } from 'autoprefixer';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/helpers/Loading';
import Play from '../../components/Play';

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
  const [game, setGame] = useState("waiting");
  // state for room_id
  const [room_id, setRoomId] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [quizId, setQuizId] = useState(null);

  useEffect(() => {
    const getAllQuizzes = async () => {
      const response = await axios.get(
        'http://localhost:5000/lti/quiz/list',
        { headers: { Authorization: `Bearer ${router.query.ltik}` } }
      );

      // setListQuiz(response.data.data.quiz_list);
      // console.log(']> get quiz data: ', response.data.data);
      const data = response.data.data;
      if (data.isQuiz) {
        const quiz_data = data.isQuiz;
        setQuizId(quiz_data.quiz_id);
        console.log('quiz_data question', JSON.parse(quiz_data.question));
        setNumQuestions(JSON.parse(quiz_data.question).length);
        const socket_id = quiz_data.socket_id;
        const status = quiz_data.status;
        console.log('status', status);
        if (status === QuizStatusEnum.PLAYING) {
          setRoomId(socket_id);
          setGame('play');
        }
        if (status === QuizStatusEnum.DONE) {
          setGame('done');
        }
      }
    };
    if (router.query.ltik) {
      getAllQuizzes();
    }
  }, [router.query.ltik]);

  return (
    <>
      {
        game === "waiting" && <Loading message='Wating game' />
      }
      {
        game === "play" && <Play quizId={quizId} total_questions={numQuestions} room_id={room_id}/>
      }
    </>

  );
}
