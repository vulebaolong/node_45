import express from "express"


const rootRouter = express.Router()

rootRouter.get(`/`, (request, respone, next) => {
   respone.json(`ok`);
});


// rootRouter.use("/video", videoRouter)

// rootRouter.use("/auth", authRouter)


export default rootRouter