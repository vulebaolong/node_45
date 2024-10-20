import express from "express";
import videoRouter from "./video.router.js";

const rootRouter = express.Router();

rootRouter.get(
   `/`,
   (req, res, next) => {
      console.log(1);
      const payload = `oke`;
      req.duLieuTruyenDi = payload;
      next();
   },
   (req, res, next) => {
      req.duLieuTruyenDi += ` + 1`;
      console.log(3);
      next();
   },
   (req, res, next) => {
      req.duLieuTruyenDi += ` + 2`;
      console.log(3);
      next();
   },
   (request, respone, next) => {
      respone.json(`oke`);
   }
);

rootRouter.use("/video", videoRouter);

// rootRouter.use("/auth", authRouter)

export default rootRouter;
