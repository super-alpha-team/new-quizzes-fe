import Loading from 'components/launch/Loading';
import SubmitButton from 'components/helpers/SubmitButton';
import React, { useEffect, useState } from 'react';
import { randomHexColor } from '../../utils/helpers';
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
            setCurrentColor(randomHexColor());
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
        return '#ffffff';
    }

    function onSubmit() {
        let data = Object.fromEntries(answers.map(answer => [answer.l, answer.r]));
        handleAnswer(data);

        setWaitingMsg(`Great! Let's wait for your mates`);
    }

    return (waitingMsg ?
        <Loading message={waitingMsg} /> :
        <div className='w-full h-full flex flex-col justify-between gap-8'>
            <div className='w-full h-full grid grid-cols-2 justify-between gap-[5%]'>
                <div className='flex flex-col justify-between content-between gap-[10%]'>
                    {
                        data.stems.map(({ id, answer }) =>
                            <button className={'w-full h-full min-h-max p-1 text-left shadow-[0_4px_0_0_#D9D9D9] bg-white rounded-md'} style={{ backgroundColor: setColor(true, id) }} onClick={(e) => leftColumnOnClick(id)} value={answer} key={id}>
                                <TeXDisplay content={answer} />
                            </button>
                        )
                    }
                </div>
                <div className='flex flex-col justify-between content-between gap-[10%]'>
                    {
                        data.choices.map(({ id, answer }) =>
                            <button className={'w-full h-full min-h-max p-1 text-left shadow-[0_4px_0_0_#D9D9D9] bg-white rounded-md'} style={{ backgroundColor: setColor(false, id) }} onClick={(e) => rightColumnOnClick(id)} value={answer} key={id}>
                                <TeXDisplay content={answer} />
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