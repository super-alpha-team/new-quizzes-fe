import React from 'react';
import { randomHexColor } from '../utils/helpers';

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    const greaterThanTwo = [r, g, b].map(c => c > 120).filter(c => c).length;
    const tooMuchBlue = r <= 60 && g <= 60 && b >= 120;
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return result ? `(${r}, ${g}, ${b}) ${luma < 40 || tooMuchBlue ? true : ''}` : null;
}

function Colors() {
    const colors = Array(80).fill(0).map(c => randomHexColor());

    return (
        <div className='grid grid-cols-9 gap-3 m-2'>
            {colors.map((color, index) => <div className='w-32 h-16 shadow-answer border-2 border-black' key={index} style={{ backgroundColor: color }}>{hexToRgb(color)}</div>)}
        </div>
    );
}

export default Colors;