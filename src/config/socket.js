let io;
import { Server } from "socket.io";

const initSocket = (server) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
  ].filter(Boolean);

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
     
    },
    transports: ['websocket', 'polling']
  });

  io.on("connection", (socket) => {
    // console.log("Client connected:", socket.id);
    socket.on("join_poll", (pollId) => {
      // console.log("Joined room:", pollId);
      socket.join(`poll_${pollId}`);
    });
  });
};

const getIO = () => io;
export { initSocket, getIO };
