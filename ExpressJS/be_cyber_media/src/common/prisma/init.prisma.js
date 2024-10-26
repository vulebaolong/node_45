import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
   omit: {
      users: {
         pass_word: true
      }
   }
});

export default prisma