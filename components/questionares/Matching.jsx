import React, { useEffect, useState } from 'react';
import { randomHexColor } from '../../utils/helpers';

function Matching({ data }) {
    const [currentSelect, setCurrentSelect] = useState({ l: -1, r: -1 });
    const [currentColor, setCurrentColor] = useState(randomHexColor());
    const [answers, setAnswers] = useState([]);
    const [colors, setColors] = useState([]);

    function answerOnClick(id) {
        let index = checkAnswerExist(id);
        if (index !== -1) {
            removeAnswer(index);
            setCurrentSelect({ l: -1, r: -1 });
        } else {
            if (currentSelect.l === -1) {
                setCurrentSelect({ ...currentSelect, l: id });
            } else if (currentSelect.l !== id) {
                setCurrentSelect({ ...currentSelect, r: id });
            } else {
                setCurrentSelect({ l: -1, r: -1 });
            }
        }
    }

    console.log(currentSelect, answers, colors);
    function checkAnswerExist(id) {
        return answers.findIndex(answer => answer.l === id || answer.r === id);
    }
    function removeAnswer(index) {
        setAnswers(answers.slice(0, index).concat(answers.slice(index + 1)));
        setColors(colors.slice(0, index).concat(colors.slice(index+1)));
    }
    useEffect(() => {
        if (currentSelect.l !== -1 && currentSelect.r !== -1) {
            setAnswers(answers.concat(currentSelect));
            setColors(colors.concat(currentColor));
            setCurrentColor(randomHexColor());
            setCurrentSelect({ l: -1, r: -1 });
        }
    }, [currentSelect]);

    function setColor(id) {
        if (currentSelect.l === id || currentSelect.r === id) {
            return currentColor;
        }
        let index = checkAnswerExist(id);
        if (index !== -1) {
            return colors[index];
        }
        return '#ffffff';
    }

    return (
        <div className='w-full h-full grid grid-cols-2 gap-y-4 gap-x-12'>
            {data.map((value, index) =>
                <button className={'w-full h-full p-1 border-black border-2 text-left shadow-answer bg-white rounded-md'} style={{ backgroundColor: setColor(value.id) }} dangerouslySetInnerHTML={{ __html: value.answer }} onClick={(e) => answerOnClick(value.id)} value={value.answer} key={value.id}>
                </button>
            )}
        </div>
    );
}

export default Matching;