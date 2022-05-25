import React, { useEffect, useState } from 'react';
import ToggleSwitch from '../helpers/ToggleSwitch';
import TopCard from './TopCard';

function RankingTable({ columns, data, listStudentJoined }) {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const newState = [];
        for(const row in data){
            const tmpArr = [];
            for(const cell in data[row]){
                tmpArr.push(data[row][cell]);
            }
            
            newState.push({id: row, score: tmpArr});
        }
        setRowData(newState);

    }, [data]);
    // console.log("final row", rowData);

    return (
        <div className="w-10/12 m-auto">
            <div className="grid grid-cols-3 mt-8">
                <div></div>
                <div className="flex justify-center">Top Student</div>
                <div className="flex justify-end">
                    <div className="flex items-center gap-4">
                        <p>Hiển thị tên</p>
                        <ToggleSwitch />
                    </div>
                </div>
            </div>
            <div className="flex gap-8 justify-center">
                <TopCard />
                <TopCard />
                <TopCard />
            </div>
            <table className="min-w-full divide-y divide-gray-200 mt-12">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rowData.map((row, i) => {
                        return (
                            <tr key={i}>
                                {listStudentJoined.filter((stu) => stu.id == row.id).map((stu, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-center">
                                        {stu.name}
                                    </td>
                                ))}
                                {row.score.map((cell, i) => {
                                    return (
                                        <td
                                            key={i}
                                            className="px-6 py-4 whitespace-nowrap text-center"
                                        >
                                            {cell}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RankingTable;
