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

    const shuffledAnswers = data.length ? shuffleArray([...data]) : shuffleArray([{ id: 1, answer: 'True' }, { id: 2, answer: 'False' }]);
    // < 3
    // 3 6 9 12
    // 4 8 16
    // 5 10
    // rest
    const numAnswers = shuffledAnswers.length;
    const two = numAnswers === 2;
    const three = numAnswers % 3 === 0;
    const four = numAnswers % 4 === 0;
    const five = numAnswers % 5 === 0;

    return (
        <>
            {/* <div className={`w-full h-full grid gap-4 items-end ` + (two ? 'grid-rows-2' : five ? 'grid-cols-5' : four ? 'grid-cols-4' : three ? 'grid-cols-3' : 'grid-cols-7')}>
                {shuffledAnswers.map(answer =>
                    <button className='w-full h-full max-h-64' onClick={() => handleAnswer(Number(answer.id))} key={answer.id}>
                        <div className='w-full h-full p-2 rounded-md text-left text-white shadow-light hover:opacity-100 hover:text-opacity-80 opacity-90' style={{ backgroundColor: randomHexColor() }} >
                            <TeXDisplay content={answer.answer} />
                        </div>
                    </button>
                )}
            </div> */}
            <div className={`w-full px-4 grid gap-4 items-end ` + (two ? 'grid-cols-2' : five ? 'grid-cols-5' : four ? 'grid-cols-4' : three ? 'grid-cols-3' : 'grid-cols-7')}>
                {shuffledAnswers.map(({ id, answer }, index) =>
                    <button className='w-full h-full py-4 px-2 text-xl text-white hover:opacity-95 rounded-sm' style={{ backgroundColor: colors[index%colors.length], boxShadow: `0 3px ${shadowColors[index%colors.length]}`}} onClick={() => handleAnswer(Number(id))} key={id}>
                        <TeXDisplay content={answer} />
                    </button>
                )}
            </div>
        </>
    );
}

export default Multichoice;
