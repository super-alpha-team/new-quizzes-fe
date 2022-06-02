export function configData(questionType, data) {
    switch (questionType) {
        case 'choice':
        case 'true/false':
            return configDataForMultichoice(data);
            break;

        case 'matching':
            return configDataForMatching(data);
            break;

        case 'draganddrop':
            return configDataForDragAndDrop(data);
            break;

        default:
            return data;
            break;
    }
}

function configDataForMultichoice(data) {

}

function configDataForMatching(data) {
    const choices = Object.entries(data.choices).map(arr => {
        return { id: arr[0], answer: arr[1] };
    });
    const stems = Object.entries(data.stems).map(arr => {
        return { id: arr[0], answer: arr[1] };
    });
    return { choices, stems };
}

const items = Array(2).fill({ id: 0, answer: 'mock data' }).map((v, index) => ({ id: index + 1, answer: `${v.answer} ${index + 1}` }));
const mockDragDropData = Array(2).fill({ type: 0, items })
    .map((v, index) => ({ type: index + 1, items: v.items }));

function configDataForDragAndDrop(data) {
    let choices = [];
    if(data) {
        choices = Object.entries(data?.choices)
            .map(([key, value]) => ({ type: key, items: value }))
            .map(({ type, items }) => ({ type, items: Object.entries(items).map(([key, value]) => ({ id: key, answer: value.text })) }));
    }
    return {fragments: data?.textfragments, choices};
}