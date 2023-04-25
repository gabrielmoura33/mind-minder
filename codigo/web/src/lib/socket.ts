import { io } from 'socket.io-client';

const socket = io('http://localhost:3335', {
  autoConnect: true,
});

const emitEvent = (event, data) => {
  if (socket.connected) {
    socket.emit(event, data);
  } else {
    console.error('Socket is not connected.');
  }
};

export  {socket, emitEvent};
