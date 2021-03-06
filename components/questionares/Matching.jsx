import Loading from 'components/launch/Loading';
import SubmitButton from 'components/helpers/SubmitButton';
import React, { useEffect, useState } from 'react';
import { getCorrespondingShadowColorByHex, getDefaultColor, randomHexColor } from '../../utils/helpers';
import TeXDisplay from '../helpers/TeXDisplay';

function Matching({ data, handleAnswer }) {
    const [currentSelect, setCurrentSelect] = useState({ l: -1, r: -1 });
    const [currentColor, setCurrentColor] = useState(randomHexColor());
    const [answers, setAnswers] = useState([]);
    const [colors, setColors] = useState([]);
    const [waitingMsg, setWaitingMsg] = useState(null);

    function leftColumnOnClick(id) {
        if (!removeAnswerIfExist(true, id)) {
            setCurrentSelect({ ...currentSelect, l: id });
        }
    }

    function rightColumnOnClick(id) {
        if (!removeAnswerIfExist(false, id)) {
            setCurrentSelect({ ...currentSelect, r: id });
        }
    }

    function removeAnswerIfExist(isLeft, id) {
        let index = answers.findIndex(answer => (isLeft && answer.l === id) || (!isLeft && answer.r === id));
        if (index != -1) {
            setAnswers(answers.slice(0, index).concat(answers.slice(index + 1)));
            setColors(colors.slice(0, index).concat(colors.slice(index + 1)));
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (currentSelect.l !== -1 && currentSelect.r !== -1) {
            setAnswers(answers.concat(currentSelect));
            setColors(colors.concat(currentColor));
            setCurrentColor(getDefaultColor(colors.length));
            setCurrentSelect({ l: -1, r: -1 });
        }
    }, [currentSelect]);

    function setColor(isLeft, id) {
        if ((isLeft && currentSelect.l === id) || (!isLeft && currentSelect.r === id)) {
            return currentColor;
        }
        let index = answers.findIndex(answer => (isLeft && answer.l === id) || (!isLeft && answer.r === id));
        if (index !== -1) {
            return colors[index];
        }
        return '';
    }

    function onSubmit() {
        let data = Object.fromEntries(answers.map(answer => [answer.l, answer.r]));
        handleAnswer(data);

        setWaitingMsg(`Great! Let's wait for your mates`);
    }

    function isSelected(isLeft, id) {
        if ((isLeft && currentSelect.l === id) || (!isLeft && currentSelect.r === id)) return true;
        return answers.findIndex(answer => (isLeft && answer.l === id) || (!isLeft && answer.r === id)) != -1;
    }

    function findMatch(id) {
        let index = answers.findIndex(answer => answer.r === id);
        if (index != -1) {
            return data.stems.find(v => v.id == answers[index].l).alphabetId;
        }
        return -1;
    }

    return (waitingMsg ?
        <Loading message={waitingMsg} /> :
        <div className='w-full h-full flex flex-col justify-between gap-8'>
            <div className='w-full h-full grid grid-cols-2 justify-between gap-[5%]'>
                <div className='w-full h-full flex flex-col justify-start gap-[1rem]'>
                    {
                        data.stems.map(({ id, answer, alphabetId }) =>
                            <div className={'flex justify-center items-center gap-2 min-h-[4rem] py-1 px-2 text-left shadow-[0_4px_0_0_#D9D9D9] bg-white rounded-md cursor-pointer ' + (isSelected(true, id) ? 'text-white' : '')} style={{ backgroundColor: setColor(true, id), boxShadow: `0 3px ${getCorrespondingShadowColorByHex(setColor(true, id))}` }} onClick={(e) => leftColumnOnClick(id)} value={answer} key={id}>
                                <div className='rounded-full bg-qgray text-black w-max h-max text-sm min-h-[1.25rem] min-w-[1.25rem] text-center block align-middle' style={{ color: setColor(true, id) }}>{alphabetId}</div>
                                <div className='w-full flex justify-center'>
                                    <TeXDisplay content={answer} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='w-full h-full flex flex-col justify-start gap-[1rem]'>
                    {
                        data.choices.map(({ id, answer }) =>
                            <button className={'flex justify-center items-center min-h-[4rem] py-1 px-2 text-left shadow-[0_4px_0_0_#D9D9D9] bg-white rounded-md ' + (isSelected(false, id) ? 'text-white' : '')} style={{ backgroundColor: setColor(false, id), boxShadow: `0 3px ${getCorrespondingShadowColorByHex(setColor(false, id))}` }} onClick={(e) => rightColumnOnClick(id)} value={answer} key={id}>
                                <div className={'rounded-full bg-qgray text-black w-max h-max text-sm min-h-[1.25rem] min-w-[1.25rem] text-center align-middle' + ((findMatch(id) != -1) ? ' block' : '   hidden')} style={{ color: setColor(false, id) }}>{findMatch(id)}</div>
                                <div className={'w-full flex justify-center'}>
                                    <TeXDisplay content={answer} />
                                </div>
                            </button>
                        )
                    }
                </div>

            </div>
            <div className='self-end'>
                <SubmitButton text={'Submit'} onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default Matching;