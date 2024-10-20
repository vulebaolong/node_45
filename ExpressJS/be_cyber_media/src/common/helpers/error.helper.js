import { responseError } from "./response.helper.js";

export const handlerError = (err, req, res, next) => {
   console.log(`Lỗi ở cuối cùng`, err);
   const resData = responseError(err.message, err.code);
   res.status(resData.code).json(resData);
};

export class BadRequestError extends Error {
   constructor(message = "BadRequestError") {
      super(message);
      this.code = 400;
   }
}
