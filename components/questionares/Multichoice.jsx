import { randomHexColor, shuffleArray } from "../../utils/helpers";

function Multichoice({ answers, handleAnswer }) {
    const shuffledAnswers = shuffleArray([...answers]);

    return (
        <div className={shuffledAnswers.length < 4 ? (shuffledAnswers.length === 3 ? `w-full h-full grid gap-4 grid-cols-3` : `w-full h-full grid gap-4 grid-rows-2`) : `w-full h-full grid gap-4 grid-cols-4`}>
            {shuffledAnswers.map((answer, index) =>
                <button className='' onClick={() => handleAnswer(answer.answer)} key={answer.id}>
                    <div className='w-full h-full p-1 border-black border-2 rounded-md text-left shadow-answer hover:bg-white' style={{ backgroundColor: randomHexColor() }} dangerouslySetInnerHTML={{ __html: answer.answer }} />
                </button>
            )}
        </div>);
}

export default Multichoice;
