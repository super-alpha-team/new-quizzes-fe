import colors from 'tailwindcss/colors';

function Multichoice({ data: { correct_answer, incorrect_answers }, handleAnswer }) {
    const shuffledAnswers = shuffleArray([correct_answer, ...incorrect_answers]);
    const randomColors = shuffleArray(Array(10).fill(0).map((v, index) => `bg-random${index}`));

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

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function randomHexColor() {
    const part = () =>
        Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0');
    const r = part();
    const g = part();
    const b = part();
    return `#${r}${g}${b}`;
}

export default Multichoice;
