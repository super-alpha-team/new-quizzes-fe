export function configData(questionType, data) {
    switch (questionType) {
        case 'choice':
        case 'true/false':
            return configDataForMultichoice(data);
            break;

        case 'matching':
            return configDataForMatching(data);
            break;

        default:
            break;
    }
}

function configDataForMultichoice(data) {

}

function configDataForMatching(data) {
    console.log('>>>', data);
    const choices = Object.entries(data.choices).map(arr => {
        return { id: arr[0], answer: arr[1] };
    });
    const stems = Object.entries(data.stems).map(arr => {
        return { id: arr[0], answer: arr[1] };
    });
    return { choices, stems };
    // const mockData = Array(6).fill({ answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', id: 0 })
    //     .map((e, i) => {
    //         return { ...e, id: i };
    //     });
    // return mockData;
}