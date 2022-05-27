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

function configDataForDragAndDrop(data) {
    console.log('>>>', data);
    return data;
}