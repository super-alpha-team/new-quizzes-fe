import TeXDisplay from "components/helpers/TeXDisplay";
import Clock from "components/playing/Clock";

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
    `<p dir="ltr" style="text-align: left;"><img src="https://i.pinimg.com/474x/22/4b/0e/224b0e5707e8ffa94e25d9e3d9c0c20d.jpg" alt="Cat" class="img-fluid atto_image_button_text-bottom" width="474" height="368"><br></p>`,
    `<p dir="ltr" style="text-align: left;">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br></p>`,
];
const colors = ['#1368CE', '#D89E00', '#26890C', '#E21B3C'];
const shadowColors = ['#1059AF', '#B88600', '#20750A', '#C01733'];

function Kahoot() {

    return (
        <div className="h-screen bg-qgray-light font-display font-semibold">
            <div className='fixed top-0 left-0 z-10 bg-white border-b-2 border-gray-300 p-2 w-full'>1 of 30</div>
            <div className="w-full h-full pt-10 pb-20 flex flex-col items-center justify-between bg-qgray-light">
                <div className="w-full max-h-min text-justify px-12 py-4 tracking-wider text-gray-dark leading-10 flex justify-center items-center lg:text-xl md:text-lg text-base bg-white rounded-sm shadow-[0_0_2px_1px_rgba(0,0,0,.1)]">
                    <TeXDisplay content={mockQuestions[1]} />
                </div>
                <div className='w-full h-full py-4 grid grid-cols-3 items-center justify-center'>
                    <Clock duration={Number(5)} handleTimeUp={() => { }} currentIndex={0} />
                    {/* <div className="">img</div>
                        <div className="">answers</div> */}
                </div>
                <div className='w-full grid grid-cols-2 gap-2 px-4'>
                    {mock.map(({ id, answer }, index) =>
                        <div key={id} className="w-full h-full py-4 px-2 text-xl text-white hover:opacity-95 rounded-sm" style={{ backgroundColor: colors[index], boxShadow: `0 3px ${shadowColors[index]}` }} >{answer}</div>
                    )}
                </div>
            </div>
            <div className="w-full text-lg py-4 px-4 fixed bottom-0 left-0 z-10 flex justify-between bg-white shadow-[0_0_2px_1px_rgba(0,0,0,.1)]">
                <div className="">Chloe</div>
                <div className="bg-qgray-dark text-white px-8 rounded-sm">0</div>
            </div>
        </div>
    );
}

export default Kahoot;