// Bước 1: npm init
// Bước 2: npm i express

// Reload server
// Cách 1: dùng thư viện nodemon
// Cách 2: dùng --watch của node hỗ trợ
import express from "express";
import cors from "cors";
import rootRouter from "./src/routers/root.router.js";
import { responseError } from "./src/common/helpers/response.helper.js";
import { handlerError } from "./src/common/helpers/error.helper.js";
import { createServer } from "node:http";
import initSocket from "./src/common/socket/init.socket.js";
import schema from "./src/common/graphql/schema.graphql.js";
import root from "./src/common/graphql/root.graphql.js";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

const app = express();
const server = createServer(app);

// sử dụng middleware chuyển JSON sang đối tượng JS (object, ...)
// sử dụng với body                                                                                                                                                        AV
app.use(express.json());
// cors
app.use(
   cors({
      origin: [`http://localhost:5173`, `https://google.com`],
   })
);
app.use(express.static("."))


app.get("/ruru", (_req, res) => {
   res.type("html")
   res.end(ruruHTML({ endpoint: "/graphql" }))
 })

 
app.all(
   "/graphql",
   createHandler({
      schema: schema,
      rootValue: root,
   })
);

app.use(rootRouter);

app.use(handlerError);

initSocket(server);

const PORT = 3069;
server.listen(PORT, () => {
   console.log(`Server online at port 1234 ${PORT}`);
});

/**
 * PRISMA
 * B1: npx prisma init
 * B2: npx prisma db pull => kéo table vào file schema.prisma
 * B3: npx prisma generate => tạo object giống vói table bên trong db
 */

// // 4 cách nhận dữ liệu
// /**
//  * Query Parameters
//  * Nhận biết: bắt đầu bằng dấu chấm hỏi (?) phân tách các key với nhau bằng dấu &
//  * Thường dùng: phân trang, lọc, search, ....
//  */
// app.get(`/query`, (request, respone, next) => {
//    const query = request.query;

//    console.log(query);

//    respone.json(`Query Parameters`);
// });

// /**
//  * Patch Paramerters
//  * Nhận biết: dùng /:ten_bien
//  * Thường dùng: khi muốn lấy dữ liẹu cụ thể của một đối tượng
//  */
// app.get(`/patch/:id`, (request, respone, next) => {
//    const params = request.params;

//    console.log(params);

//    respone.json(`Patch Paramerters`);
// });

// /**
//  * Body
//  * phải dùng app.use(express.json());
//  * Thường dùng: cho dữ liệu phức tạp, nhiều, lớn
//  */
// app.post(`/body`, (request, respone, next) => {
//    const body = request.body;

//    console.log(body);

//    respone.json(`body`);
// });

// /**
//  * headers
//  */
// app.get(`/headers`, (request, respone, next) => {
//    const headers = request.headers;

//    console.log({ headers });

//    respone.json(`headers`);
// });
