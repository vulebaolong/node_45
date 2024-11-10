import prisma from "../common/prisma/init.prisma.js";

export const userService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      let { page, pageSize } = req.query;

      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;
      const totalItem = await prisma.users.count();
      const totalPage = Math.ceil( totalItem / pageSize);

      console.log({ page, skip });
      const users = await prisma.users.findMany({
         take: pageSize,
         skip: skip,

         orderBy: {
            created_at: `desc`
         }
      });

      return {
         page: page,
         pageSize: pageSize,
         totalItem: totalItem,
         totalPage: totalPage,
         items: users || [],
      };
      return `This action returns all user`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} user`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} user`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} user`;
   },
};