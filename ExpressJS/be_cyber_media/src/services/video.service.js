import { BadRequestError } from "../common/helpers/error.helper.js";
import pool from "../common/mysql2/pool.myslq2.js";
import videoTypeModel from "../models/video-type.model.js";

const videoService = {
   listVideo: async () => {
         const [result, fields] = await pool.query("SELECT * FROM videos");

         return result;
   },
   videoType: async () => {
      const result = await videoTypeModel.findAll();

      return result;
   },
};

export default videoService;
