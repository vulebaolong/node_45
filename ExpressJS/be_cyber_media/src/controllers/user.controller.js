import { responseSuccess } from "../common/helpers/response.helper.js";
import { userService } from "../services/user.service.js";

export const userController = {
   create: async function (req, res, next) {
      try {
         const result = await userService.create(req);
         const response = responseSuccess(result, `Create user successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await userService.findAll(req);
         const response = responseSuccess(result, `Get all users successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await userService.findOne(req);
         const response = responseSuccess(result, `Get user #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await userService.update(req);
         const response = responseSuccess(result, `Update user #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await userService.remove(req);
         const response = responseSuccess(result, `Remove user #${req.params.id} successfully`);
         res.status(response.code).json(response);
      } catch (err) {
         next(err);
      }
   }
};