import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Play from '../../components/Play';

const QuizStatusEnum = {
  EDITING: 'editing',
  PENDING: 'pending',
  PLAYING: 'playing',
  DONE: 'done',
  array: ['editing', 'pending', 'playing', 'done']
}

export default function PlayGame() {
  const router = useRouter();

  // state for game
  const [game, setGame] = useState("waiting");
  // state for room_id
  const [room_id, setRoomId] = useState("");

  useEffect(() => {
    const getAllQuizzes = async () => {
      const response = await axios.get(
        'http://localhost:5000/lti/quiz/list',
        { headers: { Authorization: `Bearer ${router.query.ltik}` } }
      );

      // setListQuiz(response.data.data.quiz_list);
      console.log(']> get quiz data: ', response.data.data);
      const data = response.data.data;
      if (data.isQuiz) {
        const quiz_data = data.isQuiz;
        const socket_id = quiz_data.socket_id;
        const status = quiz_data.status;
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
        game === "waiting" && <p>Wating game</p>
      }
      {
        game === "play" && <Play room_id={room_id}/>
      }
    </>

  );
}
