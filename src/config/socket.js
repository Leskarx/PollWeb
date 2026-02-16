let io;
import { Server } from "socket.io";

const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_poll", (pollId) => {
      socket.join(`poll_${pollId}`);
    });
  });
};

const getIO = () => io;
export { initSocket, getIO };
