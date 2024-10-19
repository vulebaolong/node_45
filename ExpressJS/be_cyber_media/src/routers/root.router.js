import express from "express"
import videoRouter from "./video.router.js";

const rootRouter = express.Router()

rootRouter.get(`/`, (request, respone, next) => {
   respone.json(`ok`);
});

rootRouter.use("/video", videoRouter)

// rootRouter.use("/auth", authRouter)


export default rootRouter