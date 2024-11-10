import prisma from "../prisma/init.prisma.js";

const chatSocket = (io, socket) => {
   socket.on(`join-room`, (data) => {
      console.log({ data });

      const { user_id_sender, user_id_recipient } = data;

      const roomId = [user_id_sender, user_id_recipient].sort((a, b) => a - b).join("_");

      console.log({ roomId });

      socket.rooms.forEach(roomId => {
         socket.leave(roomId)
      });

      socket.join(roomId);
   });

   socket.on(`send-message`, async (data) => {
      console.log({ data });
      const { user_id_sender, user_id_recipient, message } = data;
      const roomId = [user_id_sender, user_id_recipient].sort((a, b) => a - b).join("_");

      io.to(roomId).emit(`receive-message`, data);

      await prisma.chats.create({
         data: {
            message: message,
            user_id_sender: user_id_sender,
            user_id_recipient: user_id_recipient,
         },
      });

   });

   socket.on(`get-list-message`, async (data) => {
      console.log({ 1123: data });
      const { user_id_sender, user_id_recipient } = data;

      const chats = await prisma.chats.findMany({
         where: {
            user_id_sender: { in: [user_id_sender, user_id_recipient] },
            user_id_recipient: { in: [user_id_sender, user_id_recipient] },
         },
      });

      const roomId = [user_id_sender, user_id_recipient].sort((a, b) => a - b).join("_");
      socket.emit(`get-list-message`, chats)
   });
};

export default chatSocket;
