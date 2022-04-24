import { io } from 'socket.io-client';
import { SERVER_PORT } from './config';

export const socket = io(`http://localhost:${SERVER_PORT}`);