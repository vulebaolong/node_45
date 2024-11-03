import prisma from "../common/prisma/init.prisma.js";

export const roleService = {
   create: async function (req) {
      return "This action create";
   },

   findAll: async function (req) {
      let { page, pageSize } = req.query;

      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;
      const totalItem = await prisma.roles.count();
      const totalPage = Math.ceil(totalItem / pageSize);

      console.log({ page, skip });
      const roles = await prisma.roles.findMany({
         take: pageSize,
         skip: skip,

         orderBy: {
            created_at: `desc`,
         },
      });

      return {
         page: page,
         pageSize: pageSize,
         totalItem: totalItem,
         totalPage: totalPage,
         items: roles || [],
      };
   },

   findOne: async function (req) {
      const role = await prisma.roles.findUnique({
         where: {
            role_id: +req.params.id,
         },
      });
      return role;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} role`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} role`;
   },

   togglePermission: async (req) => {
      const { permission_id, role_id } = req.body;

      const role_permission_exist = await prisma.role_permissions.findFirst({
         where: {
            permission_id: permission_id,
            role_id: role_id,
         },
      });

      if (role_permission_exist) {
         // nếu tồn tại thì lật is_active lại: true thì thành false / còn false thì thành true => dùng dấu chấm than !
         await prisma.role_permissions.update({
            where: {
               role_permissions_id: role_permission_exist.role_permissions_id,
            },
            data: {
               is_active: !role_permission_exist.is_active,
            },
         });
      } else {
         // nếu không tồn tại, sẽ tạo mới, is_active = true
         await prisma.role_permissions.create({
            data: {
               permission_id: permission_id,
               role_id: role_id,
               is_active: true, // có hoặc không có cũng được vì mặc định default không truyền là true
            },
         });
      }

      return `oke`;
   },
};
