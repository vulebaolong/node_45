import { responseSuccess } from "../common/helpers/response.helper.js";
import videoService from "../services/video.service.js";

const videoController = {
   listVideo: async (req, res, n) => {
      const result = await videoService.listVideo(req);

      const resData = responseSuccess(result,`Lấy danh sách video thành công`)

      res.status(resData.code).json(resData);
   },
   videoType: async (req, res, next) => {
      const result = await videoService.videoType();

      const resData = responseSuccess(result,`Lấy loại video thành công`)
      
      res.status(resData.code).json(resData);
   },
};

export default videoController;
