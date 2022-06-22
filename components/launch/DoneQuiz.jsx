/* eslint-disable @next/next/no-img-element */
import playApi from 'apis/playApi';
import React, { useEffect, useState } from 'react';

function DoneQuiz({ token, history, quizId = 1, maxGrade = 10 }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(history.map(v => ({ ...v, correctness: (v.grade / maxGrade) })));
    }, []);

    return (
        <section className="relative py-8 bg-qgray min-h-screen text-sm lg:text-xl md:text-lg">
            <div className="w-full mb-12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-qpurple-dark text-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-white uppercase flex justify-center">History</h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto ">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-qpurple-dark text-pink-300 border-qpurple-light">Instance</th>
                                    <th className="px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-qpurple-dark text-pink-300 border-qpurple-light">Grade</th>
                                    {/* <th className="px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-qpurple-dark text-pink-300 border-qpurple-light">Rank</th> */}
                                    <th className="px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-qpurple-dark text-pink-300 border-qpurple-light">Correctness</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(({ id, name, grade, correctness }) =>
                                    <tr key={id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center">
                                            <span className="font-bold text-white bg-qpurple py-1 px-2">{name}</span></th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4"><div className="flex items-center">
                                            <span className={"mr-2 bg-qgray px-4 min-w-[4rem] text-center rounded-full font-bold" + (correctness >= 0.5 ? ' text-qgreen' : ' text-qred')}>{parseFloat(Number(grade).toFixed(2))}/{maxGrade}</span>
                                        </div>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4"><div className="flex items-center">
                                            <span className="mr-2 min-w-[3rem]">{`${Math.round(correctness * 100)}%`}</span>
                                            <div className="relative w-full">
                                                <div className="overflow-hidden h-2 flex rounded bg-qgray-light">
                                                    <div style={{ width: `${correctness * 100}%` }} className={"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center" + (correctness >= 0.5 ? ' bg-qgreen' : ' bg-qred')}></div>
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-right">
                                            <div className={"h-8 w-8 text-white font-extrabold border-2 border-qyellow-light flex justify-center items-center bg-qyellow rounded-full"}>
                                                <span className=''>#{1}</span>
                                            </div>
                                        </td> */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DoneQuiz;