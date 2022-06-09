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

const answers = Array(4).fill({ answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', id: 0 })
    .map((e, i) => ({ ...e, id: i }));

const mockMatchingDataField = Array(3).fill({ id: 0, answer: 'mock matching data' })
    .map((e, i) => ({ ...e, id: i }));

const mockMatchingData = { choices: mockMatchingDataField, stems: mockMatchingDataField };

function Test() {
    const [questions, setQuestions] = useState([]);
    const [username, setUsername] = useState('');

    return (
        <>
            <PlayHeader currentIndex={1} totalQuestion={2} />
                <div className="h-screen w-screen bg-qgray-light font-display font-semibold">
                    <div className="w-full h-full pt-10 pb-20 flex flex-col items-center justify-between">
                        <div className="w-full h-full text-justify px-12 py-4 tracking-wider text-gray-dark leading-10 flex flex-wrap justify-center items-center lg:text-xl md:text-lg text-base bg-white rounded-sm shadow-[0_0_2px_1px_rgba(0,0,0,.1)]">
                            <TeXDisplay content={questionData.questiontext} />
                        </div>
                        <div className='w-full h-full py-4 grid grid-cols-3 items-center justify-center'>
                            <Clock handleTimeUp={() => handleAnswer(null)} currentIndex={currentIndex} deadTime={questionData.time_end} />
                        </div>
                        <Questionare questionType={questionData.qtype} data={config(questionData)} handleAnswer={handleAnswer} />
                    </div>
                </div>
            <PlayFooter username={username} sumGrade={rank?.sum_grade} />
        </>
    );
}

export default Test;