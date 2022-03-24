function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function randomHexColor() {
    const part = () =>
        Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0');
    const r = part();
    const g = part();
    const b = part();
    return isDark(`#${r}${g}${b}`) ? randomHexColor() : `#${r}${g}${b}`;
}


function isDark(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 40;
}

export { shuffleArray, randomHexColor };