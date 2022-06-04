
const mock = Array(4).fill(0).map((v, index) => ({ id: index + 1, answer: "Lorem sum..." }));

function Kahoot() {

    return (
        <div className="w-screen h-screen pt-32 pb-20 justify-between flex flex-col items-center bg-gray-light font-display font-semibold">
            <div className="absolute top-0 flex flex-col w-full">
                <div className='bg-white border-b-2 border-gray-300 p-2 w-full'>1 of 30</div>
                <div className="w-full px-12 py-4 tracking-wider text-gray-dark leading-10 flex justify-center items-center text-3xl bg-white rounded-sm shadow-md">
                    What is Slinky dog holding on his mouth?
                </div>
            </div>
            <div className='w-full h-full grid grid-cols-3 items-center justify-center bg-red-200'>
                <div className="w-full h-full flex items-center">
                    <div className="w-20 h-20 ml-4 flex justify-center items-center text-3xl rounded-[50%] bg-purple text-white ">12</div>
                </div>
                {/* <div className="">img</div>
                <div className="">answers</div> */}
            </div>
            <div className='w-full grid grid-cols-2 gap-2 px-4 bg-green-200'>
                {mock.map(data =>
                    <div key={data.id} className="w-full h-full py-4 px-2 text-xl text-white hover:opacity-95 bg-blue rounded-sm shadow-[0_.25rem_0_0_#1059AF]">{data.answer}</div>
                )}
            </div>
            <div className="w-full text-lg py-4 px-4 absolute bottom-0 flex justify-between bg-white shadow-[0_4px_6px_1px_rgba(0,0,0,.1)] ">
                <div className="">Chloe</div>
                <div className="bg-gray-dark text-white px-8 rounded-sm">0</div>
            </div>
        </div>
    );
}

export default Kahoot;