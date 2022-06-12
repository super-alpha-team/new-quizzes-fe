const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
const SERVER_SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_SOCKET_URL || "http://localhost:5000";

const QUIZ_STATUS = {
    EDITING: 'editing',
    PENDING: 'pending',
    PLAYING: 'playing',
    DONE: 'done',
    array: ['editing', 'pending', 'playing', 'done']
};

export { QUIZ_STATUS, CLIENT_URL, SERVER_URL, SERVER_SOCKET_URL };
