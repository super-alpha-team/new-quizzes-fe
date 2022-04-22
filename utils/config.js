// require('dotenv').config();

const LTI_URL = process.env.LTI_URL;
const BASE_URL = 'http://localhost:3000';
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

const QUIZ_STATUS = {
    EDITING: 'editing',
    PENDING: 'pending',
    PLAYING: 'playing',
    DONE: 'done',
    array: ['editing', 'pending', 'playing', 'done']
}

export { LTI_URL, BASE_URL, SERVER_URL, QUIZ_STATUS };
