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
}

export default authController