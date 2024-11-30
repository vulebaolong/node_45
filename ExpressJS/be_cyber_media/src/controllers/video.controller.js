import { responseError, responseSuccess } from "../common/helpers/response.helper.js";
import videoService from "../services/video.service.js";

/**
 * Lỗi không kiểm soát được - 500
 *
 *    try catch throw
 */

// Lỗi kiểm soát được - 403, 401, 404, 400

const videoController = {
   listVideo: async (req, res, next) => {
      try {
         const result = await videoService.listVideo(req);
         const resData = responseSuccess(result, `Lấy danh sách video thành công 3333333333333`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      } 
   },
   videoType: async (req, res, next) => {
      try {
         const result = await videoService.videoType();
         const resData = responseSuccess(result, `Lấy loại video thành công`);
         res.status(resData.code).json(resData);
      } catch (error) {
         next(error)
      }
   },
};

export default videoController;
