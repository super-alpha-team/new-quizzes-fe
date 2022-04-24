// require('dotenv').config();
const SERVER_PORT=5000;
const CLIENT_PORT=3000;
const BASE_URL = `http://localhost:${CLIENT_PORT}`;
const LTI_URL = "http://192.168.1.4";
const SERVER_URL = `http://192.168.1.4:${SERVER_PORT}`;
const LOCALHOST = `http://localhost:${SERVER_PORT}`;

const QUIZ_STATUS = {
    EDITING: 'editing',
    PENDING: 'pending',
    PLAYING: 'playing',
    DONE: 'done',
    array: ['editing', 'pending', 'playing', 'done']
};

export { LTI_URL, BASE_URL, SERVER_URL, QUIZ_STATUS, LOCALHOST, CLIENT_PORT, SERVER_PORT };
