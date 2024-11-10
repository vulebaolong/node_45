import { Server } from "socket.io";
import chatSocket from "./chat.socket.js";

const initSocket = (server) => {
   const io = new Server(server);
   io.on("connection", (socket) => {
      console.log(`${socket.id} a user connected`);

      chatSocket(io, socket);
   });
};

export default initSocket;
