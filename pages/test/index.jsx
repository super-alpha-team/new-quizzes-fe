import DragDrop from 'components/questionares/DragDrop';
import React, { useState, useEffect } from 'react';
import Clock from '../../components/playing/Clock';
import InputUsername from '../../components/launch/InputUsername';
import Essay from '../../components/questionares/Essay';
import Matching from '../../components/questionares/Matching';
import Multichoice from '../../components/questionares/Multichoice';
import Questionare from '../../components/playing/Questionare';
import ShortAnswer from '../../components/questionares/ShortAnswer';
import { configData } from 'utils/configData';
import Result from 'components/launch/Result';
import Loading from 'components/launch/Loading';
import FinalResult from 'components/launch/FinalResult';
import DoneQuiz from 'components/launch/DoneQuiz';
import PlayHeader from 'components/playing/PlayHeader';
import TeXDisplay from 'components/helpers/TeXDisplay';
import PlayFooter from 'components/playing/PlayFooter';
import NotStartedQuiz from 'components/launch/NotStartedQuiz';

const answers = Array(8).fill({ answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', id: 0 })
    .map((e, i) => ({ ...e, id: i }));

const mockMatchingDataField = Array(3).fill({ id: 0, answer: 'mock matching data' })
    .map((e, i) => ({ ...e, id: i }));

const mockMatchingData = { choices: mockMatchingDataField, stems: mockMatchingDataField };

function Test() {
    const [questions, setQuestions] = useState([]);
    const [username, setUsername] = useState('');

    function handleAnswer(answer) {
        console.log(answer);
    }

    return (
        // <>
        //     <PlayHeader currentIndex={0} totalQuestion={2} />
        //     <Result grade={0} />
        //     <PlayFooter username={`Chloe`} sumGrade={10} />
        // </>

        // <FinalResult data={({ rank: 1, username: 'Chloe', sum_grade: 10 })} />
        // <ShortAnswer handleAnswer={handleAnswer} />
        // <Clock handleTimeUp={() => { }} currentIndex={0} deadTime={(Date.now() / 1000 + 900) * 1000} />
        // <Loading message={'Great, let wait for your mates!'} />
        <></>
    );
}

export default Test;