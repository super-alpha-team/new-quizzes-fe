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
    const { choices, stems } = data;
    const mockData = Array(6).fill({ answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', id: 0 })
        .map((e, i) => {
            return { ...e, id: i };
        });
    return mockData;
}