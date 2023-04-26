import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import "dotenv/config";
import { PrismaClient, Reminder } from '@prisma/client'

import moment from 'moment-timezone';
import cron from 'node-cron';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});


app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);    
  });

  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    console.log(`Client ${socket.id} left room ${room}`);
  });

  socket.on('reminder-time', ({ room, message }) => {
    io.to(room).emit('reminder-alert', message);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

});


function broadCastToRoom(room: string, message: string) {
  io.to(room).emit('reminder-alert', message);  
}

 function sendRemindersToClient(reminders: Reminder[]) {
  for (const reminder of reminders) {
    broadCastToRoom(reminder.userId, reminder.description);
  }
}

async function getRemindersToBeSentInTheNextMinute() {
  const prisma = new PrismaClient();
  
  
  const reminders = await prisma.reminder.findMany({
    where: {
      datetime: {
        lte: moment().add(1, 'minute').tz('America/Sao_Paulo').toDate(),
        gte: moment().tz('America/Sao_Paulo').toDate()
      }
    }
  });

  console.log('>>>',reminders);
  return reminders;
}
(async () => {  
  const PORT = process.env.PORT || 3335;
  server.listen(PORT, () => console.log(`[SOCKET] Server is running on port ${PORT} `));

  const EVERY_MINUTE = '* * * * *';
  
  cron.schedule(EVERY_MINUTE, async () => {
    const reminders = await getRemindersToBeSentInTheNextMinute();
    sendRemindersToClient(reminders);
  });
})()
