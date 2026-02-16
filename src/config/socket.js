let io;
import { Server } from "socket.io";

const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*",
    },
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
