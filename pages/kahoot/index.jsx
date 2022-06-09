import TeXDisplay from "components/helpers/TeXDisplay";
import Clock from "components/playing/Clock";
import PlayFooter from "components/playing/PlayFooter";
import PlayHeader from "components/playing/PlayHeader";
import Questionare from "components/playing/Questionare";
import { configData } from "utils/configData";

const mock = Array(4).fill(0).map((v, index) => ({ id: index + 1, answer: "Lorem sum..." }));
const questionText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`;
const mockQuestions = [
    `<p dir="ltr" style="text-align: left;"><br>
    <table>
    <caption style="caption-side: top">random table</caption>
    <thead>
    <tr>
    <th scope="col">1</th>
    <th scope="col">1</th>
    <th scope="col">1</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    </tr>
    <tr>
    <td>4</td>
    <td>1</td>
    <td>5</td>
    </tr>
    </tbody>
    </table>
    <br><br></p>`,
    `<p dir="ltr" style="text-align: left;"></p><pre>The programming language Python is based off a modified version of JavaScript.<br></pre><br><p></p>`,
    `<p dir="ltr" style="text-align: left;"><img src="https://i.pinimg.com/474x/49/85/d3/4985d3e588f55038cabe2d98a64c9332.jpg" alt="Cat" class="img-fluid atto_image_button_text-bottom" width="474" height="368"><br></p>`,
    `<p dir="ltr" style="text-align: left;">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br></p>`,
];
const colors = ['#1368CE', '#D89E00', '#26890C', '#E21B3C'];
const shadowColors = ['#1059AF', '#B88600', '#20750A', '#C01733'];
const mockMatching = { choices: { 1: 'reading', 2: 'chatting', 3: 'wondering' }, stems: { 1: 'i like', 2: 'i hate', 3: 'i usually' } };


function Kahoot() {
    const questionData = {
        questiontext: mockQuestions[0],
        qtype: 'choice',
        additional_info: {},
        answers: mock,
    };

    function handleAnswer(data) {

    }

    function config(questionData) {
        switch (questionData.qtype) {
            case 'choice':
            case 'true/false':
                return questionData.answers;
                break;

            case 'matching':
            case 'draganddrop':
                return configData(questionData.qtype, JSON.parse(questionData.additional_info));
                break;

            case 'shortanswer':
            case 'numerical':
                return null;
                break;

            default:
                return null;
                break;
        }
    }

    return (
        <>
            <PlayHeader currentIndex={1} totalQuestion={2} />
            <div className="h-max min-h-screen w-full bg-qgray-light font-display">
                <div className="w-full h-full min-h-screen pt-10 pb-20 flex flex-col items-center justify-between">
                    <div className="w-full h-max text-justify px-12 py-4 tracking-wider text-gray-dark leading-10 flex justify-center items-center lg:text-xl md:text-lg text-base bg-white rounded-sm shadow-[0_0_2px_1px_rgba(0,0,0,.1)] overflow-y-auto">
                        <TeXDisplay content={questionData.questiontext} />
                    </div>
                    <div className='w-full h-full py-4 flex flex-wrap items-center'>
                        <Clock handleTimeUp={() => handleAnswer(null)} currentIndex={1} deadTime={(new Date().getTime() / 1000 + 10) * 1000} />
                    </div>
                    <Questionare questionType={questionData.qtype} data={config(questionData)} handleAnswer={handleAnswer} />
                </div>
            </div>
            <PlayFooter username={`Chloe`} sumGrade={10} />
        </>
    );
}

export default Kahoot;