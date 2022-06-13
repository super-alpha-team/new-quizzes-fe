/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/jsx-no-undef */
import { withRouter } from "next/router";
import { generateMultiStyle } from "../../utils/generateMultiStyle";
import { getCorrespondingShadowColor, getDefaultColor, randomHexColor, shuffleArray } from "../../utils/helpers";
import TeXDisplay from "../helpers/TeXDisplay";

const colors = ['#1368CE', '#D89E00', '#26890C', '#E21B3C'];
const shadowColors = ['#1059AF', '#B88600', '#20750A', '#C01733'];

function Multichoice({ data, handleAnswer }) {
    const answers = data.length ? data : [{ id: 1, answer: 'True' }, { id: 2, answer: 'False' }];
    const numAnswers = answers.length;
    const two = numAnswers === 2;
    const three = numAnswers % 3 === 0;
    const four = numAnswers % 4 === 0;
    const five = numAnswers % 5 === 0;

    return (
        <>
            <div className={`w-full min-w-0 h-full grid gap-4 grid-cols-1 ` + (two ? 'lg:grid-cols-2 md:grid-cols-2' : five ? 'lg:grid-cols-5 md:grid-cols-5' : four ? 'lg:grid-cols-4 md:grid-cols-4' : three ? 'lg:grid-cols-3 md:grid-cols-3' : 'lg:grid-cols-7 md:grid-cols-7')}>
                {answers.map(({ id, answer, alphabetId }, index) =>
                    <button className='w-full h-full flex justify-center items-center gap-2 py-4 px-2 text-xl text-white hover:opacity-95 rounded-sm' style={{ backgroundColor: getDefaultColor(index), boxShadow: `0 3px ${getCorrespondingShadowColor(index)}` }} onClick={() => handleAnswer(Number(id))} key={id}>
                        <div className='rounded-full bg-qgray text-black w-max h-max text-sm min-h-[1.25rem] min-w-[1.25rem] text-center block align-middle' style={{ color: getDefaultColor(index) }}>{alphabetId}</div>
                        <div className='w-full flex justify-start'>
                            <TeXDisplay content={answer} />
                        </div>
                    </button>
                )}
            </div>
        </>
    );
}

export default Multichoice;
