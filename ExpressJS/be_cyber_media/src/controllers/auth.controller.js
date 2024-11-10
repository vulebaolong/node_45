import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authController = {
   register: async (req, res, next) => {
      try {
         const result = await authService.register(req);
         const resData = responseSuccess(result, `Đăng ký thành công`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      } 
   },
   login: async (req, res, next) => {
      try {
         const result = await authService.login(req);
         const resData = responseSuccess(result, `Đăng nhập thành công`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      } 
   },
   loginFacebook: async (req, res, next) => {
      try {
         const result = await authService.loginFacebook(req);
         const resData = responseSuccess(result, `Đăng nhập facebook thành công`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      } 
   },
   refreshToken: async (req, res, next) => {
      try {
         const result = await authService.refreshToken(req);
         const resData = responseSuccess(result, `refresh token thành công`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      } 
   },
   getInfo: async (req, res, next) => {
      try {
         const result = await authService.getInfo(req);
         const resData = responseSuccess(result, `get info user thành công`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      } 
   },
}

export default authController