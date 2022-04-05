export function generateMultiStyle(numAnswers) {
    const isEven = numAnswers % 2 === 0;
    // if(numAnswers < 4) {
    //     return `grid-rows-${numAnswers} `;
    // } else {
    //     if(numAnswers < 6) {
    //         return `grid-cols-${numAnswers} `;
    //     } else {
    //         return `grid-rows-2 grid-cols-${numAnswers/2} `;
    //     }
    // }
    if(isEven) {
        return `grid-cols-[1fr_auto_2fr] `;
    }
    return '';
}