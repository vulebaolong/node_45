import prisma from "../common/prisma/init.prisma.js";
import _ from "lodash";

export const permissionService = {
   create: async function (req) {
      const { name, endpoint, method, module } = req.body;

      console.log({ name, endpoint, method, module });

      const newPermission = await prisma.permissions.create({
         data: {
            name: name,
            endpoint: endpoint,
            method: method,
            module: module,
         },
      });

      return newPermission;
   },

   findAll: async function (req) {
      // const [result, fields] = await pool.query("SELECT * FROM videos");
      let { page, pageSize } = req.query;

      page = +page > 0 ? +page : 1;
      pageSize = +pageSize > 0 ? +pageSize : 3;

      // (page - 1) * pageSize
      const skip = (page - 1) * pageSize;
      const totalItem = await prisma.permissions.count();
      const totalPage = Math.ceil(totalItem / pageSize);

      console.log({ page, skip });
      const permissions = await prisma.permissions.findMany({
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
         items: permissions || [],
      };

      return `This action returns all permission`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} permission`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} permission`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} permission`;
   },

   groupByModule: async (req) => {
      const roleId = +req.params.id;

      const permission = await prisma.permissions.findMany({
         include: {
            role_permissions: {
               where: {
                  role_id: roleId,
                  is_active: true,
               },
            },
         },
      });

      return _.groupBy(permission, "module");
   },
};
