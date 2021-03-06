import TopCard from './TopCard';

function RankingTable({ columns, data, topStudent, listStudentJoined }) {
    return (
        <div className="w-10/12 m-auto pb-12">
            <div className="grid grid-cols-3 mt-2">
                        <div></div>
                        <div className='flex justify-center'><div className="w-max py-4 font-bold after:block after:w-full after:h-3 text-xl text-qpurple after:bg-qpurple-light after:opacity-50 after:-mt-3 after:bg-opacity-60">Top students</div></div>
                        <div></div>
                    </div>
            <div className="grid grid-cols-3 mt-8 gap-8 justify-center">
                <TopCard data={topStudent['2']} listStudentJoined={listStudentJoined}/>
                <TopCard data={topStudent['1']} listStudentJoined={listStudentJoined}/>
                <TopCard data={topStudent['3']} listStudentJoined={listStudentJoined}/>
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
                    {Object.keys(data).map((key, index) => {
                        return (
                            <tr key={index}>
                                {listStudentJoined
                                    .filter((stu) => stu.id == key)
                                    .map((stu, index) => (
                                        <td
                                            key={index}
                                            className="px-6 py-4 whitespace-nowrap text-center"
                                        >
                                            {stu.name}
                                        </td>
                                    ))}

                                    {
                                        columns.filter((col) => col.id != 'name').map((column, index) => {
                                            return (
                                                <td
                                                    key={index}
                                                    className="px-6 py-4 whitespace-nowrap text-center"
                                                >
                                                    {/* {data[key].map((cell, ind) => Object.keys(cell).find(key => key == index))} */}
                                                    {data[key].filter((cell, ind) => Object.keys(cell).find(key => key == index)) == undefined 
                                                    ? '_' : 
                                                    data[key].filter((cell, ind) => Object.keys(cell).find(key => key == index))
                                                    .map((res, idx) => Object.keys(res).map((key1, id1)  => res[key1])
                                                    
                                                    )
                                                    
                                                    }
                                                    
                                                </td>
                                            );
                                        })
                                    }
                                                                        
                                {/* {data[key].map((cell, i) => {
                                    

                                    return Object.keys(cell).map((key1, index1) => {
                                        return (
                                            <td
                                                key={index1}
                                                className="px-6 py-4 whitespace-nowrap text-center"
                                            >
                                                
                                                {cell[key1]}
                                            </td>
                                        );
                                    });
                                })} */}
                            </tr>
                        );
                    })}
                    {/* {rowData.map((row, i) => {
                        return (
                            <tr key={i}>
                                {listStudentJoined
                                    .filter((stu) => stu.id == row.id)
                                    .map((stu, index) => (
                                        <td
                                            key={index}
                                            className="px-6 py-4 whitespace-nowrap text-center"
                                        >
                                            {stu.name}
                                        </td>
                                    ))}
                                {row.score.map((cell, i) => {
                                    Object.keys(cell).map((key1, index1) => {
                                        
                                    })
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
                    })} */}
                </tbody>
            </table>
        </div>
    );
}

export default RankingTable;
