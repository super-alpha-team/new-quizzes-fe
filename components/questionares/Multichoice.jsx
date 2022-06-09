/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/jsx-no-undef */
import { withRouter } from "next/router";
import { generateMultiStyle } from "../../utils/generateMultiStyle";
import { randomHexColor, shuffleArray } from "../../utils/helpers";
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
            <div className={`w-full min-w-0 h-full grid gap-4 ` + (two ? 'grid-cols-2' : five ? 'grid-cols-5' : four ? 'grid-cols-4' : three ? 'grid-cols-3' : 'grid-cols-7')}>
                {answers.map(({ id, answer }, index) =>
                    <button className='w-full h-full py-4 px-2 text-xl text-white hover:opacity-95 rounded-sm' style={{ backgroundColor: colors[index%colors.length], boxShadow: `0 3px ${shadowColors[index%colors.length]}`}} onClick={() => handleAnswer(Number(id))} key={id}>
                        <TeXDisplay content={answer} />
                    </button>
                )}
            </div>
        </>
    );
}

export default Multichoice;
