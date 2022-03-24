import { randomHexColor, shuffleArray } from "../../utils/helpers";

function Multichoice({ data: { correct_answer, incorrect_answers }, handleAnswer }) {
    const shuffledAnswers = shuffleArray([correct_answer, ...incorrect_answers]);

    return (
        <div className={shuffledAnswers.length < 4 ? `w-full h-full grid gap-4 grid-rows-2` : `w-full h-full grid gap-4 grid-cols-4`}>
            {shuffledAnswers.map((answer, index) =>
                <button className='' onClick={() => handleAnswer(answer)} key={index}>
                    {/* <div className='w-full h-full bg-black absolute top-1 left-1 rounded-md text-justify text-sm' /> */}
                    <div className='w-full h-full p-1 border-black border-2 rounded-md text-left shadow-answer' style={{ backgroundColor: randomHexColor() }} dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
            )}
        </div>);
}

export default Multichoice;
