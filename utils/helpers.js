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

function convertTimer(seconds) {
    if(seconds > 0) {
        let h = Math.trunc(seconds / 3600);
        let m;
        let s = seconds;
    
        if (h) {
            m = Math.trunc((seconds / 3600 - h) / 60);
            s -= h * 3600;
        } else {
            m = Math.trunc(seconds / 60);
        }
    
        if (m) {
            s -= m * 60;
        }
    
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return '00:00:00';
}

function convertToMinutes(seconds) {
    if(seconds > 0) {
        let m = Math.trunc(seconds / 60);
        let s = seconds;
    
        if (m) {
            s -= m * 60;
        }
    
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return '00:00';
}

function getDefaultColor(index) {
    return COLORS[index % COLORS.length];
}

function getCorrespondingShadowColor(index) {
    return SHADOW_COLORS[index % COLORS.length];
}

function getCorrespondingShadowColorByHex(color) {
    let index = COLORS.findIndex(v => v == color);
    if(index != -1) {
        return SHADOW_COLORS[index];
    } else {
        return '#D9D9D9';
    }
}

function setRankColor(rank) {
    return rank == 1 ? ' bg-qyellow border-qyellow-light' : rank == 2 ? ' text-blue-500 bg-blue-500 border-blue-500' : rank == 3 ? ' bg-brown-300 border-qyellow-light' : ' text-black bg-gray-100 border-qyellow-light';
}

const COLORS = ['#ffa620', '#1368ce', '#46178f', '#eb670f', '#DE1835', '#26890c', '#0aa3a3'];
const SHADOW_COLORS = ['#d89e00', '#0542b9', '#25076b', '#e24104', '#c60929', '#106b03', '#028282'];

export { shuffleArray, randomHexColor, convertTimer, convertToMinutes, getDefaultColor, getCorrespondingShadowColor, getCorrespondingShadowColorByHex, setRankColor };