import express from "express";
import videoRouter from "./video.router.js";
import authRouter from "./auth.router.js";
import roleRouter from "./role.router.js";
import permissionRouter from "./permission.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/init.swagger.js";
import userRouter from "./user.router.js";

const rootRouter = express.Router();

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get("/api-docs", (req, res, next) => {
   const urlServer = `${req.protocol}://${req.get("host")}`;
   // console.log({urlServer});

   swaggerDocument.servers = [
      // ...swaggerDocument.servers,
      {
         url: urlServer,
         description: `url server deploy`,
      },
   ]

   swaggerUi.setup(swaggerDocument, { swaggerOptions: { persistAuthorization: true } })(req, res);
});

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

rootRouter.use("/auth", authRouter);

rootRouter.use("/role", roleRouter);

rootRouter.use("/permission", permissionRouter);

rootRouter.use("/user", userRouter);

export default rootRouter;
