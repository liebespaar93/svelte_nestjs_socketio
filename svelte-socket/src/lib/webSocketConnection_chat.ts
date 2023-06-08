import ioClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000/chat';

const socket = ioClient(ENDPOINT);

export const io_chat = socket;