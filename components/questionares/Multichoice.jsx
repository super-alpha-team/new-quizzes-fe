import { withRouter } from "next/router";
import { generateMultiStyle } from "../../utils/generateMultiStyle";
import { randomHexColor, shuffleArray } from "../../utils/helpers";

function Multichoice({ answers, handleAnswer }) {
    const shuffledAnswers = shuffleArray([...answers]);
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
        <div className={`w-full h-full grid gap-4 ` + (two ? 'grid-rows-2' : five ? 'grid-cols-5' : four ? 'grid-cols-4' : three ? 'grid-cols-3' : 'grid-cols-7')}>
            {shuffledAnswers.map((answer, index) =>
                <button className='w-full h-full' onClick={() => handleAnswer({answer_id: String(answer.id)})} key={answer.id}>
                    <div className='w-full h-full p-1 border-black border-2 rounded-md text-left shadow-answer hover:text-white' style={{ backgroundColor: randomHexColor() }} dangerouslySetInnerHTML={{ __html: answer.answer }} />
                </button>
            )}
        </div>);
}

export default Multichoice;
