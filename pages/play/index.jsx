/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-script-in-head */
/* eslint-disable @next/next/no-unwanted-polyfillio */
import { data } from 'autoprefixer';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Loading from '../../components/helpers/Loading';
import Play from '../../components/Play';
import { LOCALHOST } from '../../utils/config';
import Head from 'next/head';

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

      const checkNewQuiz = await axios.get(
        `http://localhost:5000/lti/sync/lti`,
        { headers: { Authorization: `Bearer ${router.query.ltik}` } }
      );
      let checkNewQuizResp = checkNewQuiz.data.data;
      console.log("]> check newQuiz: ", checkNewQuizResp);

      let newQuizInstance = checkNewQuizResp.instance;
      console.log('quizInstance: ', newQuizInstance);

      if (newQuizInstance) {
        setQuizId(newQuizInstance.id);
        // TODO fix tamp
        setNumQuestions(10);
        const socket_id = newQuizInstance.socket_id;
        const status = newQuizInstance.status;

        if (status === QuizStatusEnum.PLAYING || status === QuizStatusEnum.PENDING) {
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

  function runTypeSetMathJax() {
    window.MathJax.typeset(); 
  }

  return (
    <>
      <Head>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6" onLoad={runTypeSetMathJax}></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" onLoad={runTypeSetMathJax}></script>
      </Head>

      {
        game === "waiting" && <Loading message='Wating game' />
      }
      {
        game === "play" && <Play quizId={quizId} total_questions={numQuestions} room_id={room_id} />
      }
    </>

  );
}
