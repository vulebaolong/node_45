// Bước 1: npm init
// Bước 2: npm i express

// Reload server
// Cách 1: dùng thư viện nodemon
// Cách 2: dùng --watch của node hỗ trợ
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";
import rootRouter from "./src/routers/root.router.js";

const app = express();

// sử dụng middleware chuyển JSON sang đối tượng JS (object, ...)
// sử dụng với body                                                                                                                                                        AV
app.use(express.json());
// cors
app.use(
   cors({
      origin: [`http://localhost:5173`, `https://google.com`],
   })
);

app.use(rootRouter)







// MYSQL2
const pool = mysql
   .createPool({
      host: `localhost`,
      user: `root`,
      password: `1234`,
      port: `3307`,
      database: `db_cyber_media`,

      // Lấy đúng thời gian đã lưu trong db
      timezone: `Z`
   })
   .promise();

app.get(`/video-list`, async (req, res, n) => {
   const [result, fields] = await pool.query("SELECT * FROM videos");

   console.log(result);

   res.json(result);
});

// SEQUELIZE
const sequelize = new Sequelize(`db_cyber_media`, `root`, `1234`, {
   host: `localhost`,
   port: `3307`,
   dialect: `mysql`,
   // logging: false
});

// Kiểm tra kết nối
sequelize
   .authenticate()
   .then(() => {
      console.log(`Kết nối db thành công`);
   })
   .catch((err) => {
      console.log(err);
      console.log(`Kết nối db không thành công`);
   });

// Code first

// model
const videoTypeModel = sequelize.define(
   `video_type`,
   {
      type_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      type_name: {
         type: DataTypes.STRING(255),
         allowNull: false,
      },
      icon: {
         type: DataTypes.STRING(255),
         allowNull: true,
      },
      created_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         allowNull: false,
      },
      updated_at: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
         allowNull: false,
         onUpdate: DataTypes.NOW,
      },
   },
   {
      tableName: `video_type`,
      // vì đã có "created_at" và "updated_at" nên sẽ để là false
      timestamps: false,
   }
);

app.get(`/video-type`, async (req, res, next) => {
   const result = await videoTypeModel.findAll();

   res.json(result);
});

const PORT = 3069;
app.listen(PORT, () => {
   console.log(`Server online at port ${PORT}`);
});








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