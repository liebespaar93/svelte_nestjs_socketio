import ioClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000/game';

const socket = ioClient(ENDPOINT);

export const io_game = socket;