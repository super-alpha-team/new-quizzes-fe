import { io } from 'socket.io-client';
import { SERVER_SOCKET_URL } from './config';

export const socket = io(SERVER_SOCKET_URL);