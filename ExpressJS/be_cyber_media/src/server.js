import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Query Parameters
 * - Nhận biết: Sau dấu ? và mỗi tham số cách nhau bằng dấu &
 * - Lấy dữ liệu thông qua: request.query
 * - Thường dùng cho: phân trang, lọc dữ liệu, tìm kiếm, ...
 */
app.get(`/query`, (request, response, next) => {
   console.log(request.query);
   response.json(`query parameter`);
});

/**
 * Path Parameters
 * - Nhận biết: Được xác định bằng dấu hai chấm (:) trong route
 * - Lấy dữ liệu thông qua: request.params
 * - Thường dùng cho: lấy một phần tử cụ thể thông qua id
 */
app.get(`/path/:id`, (request, response, next) => {
   console.log(request.params);
   response.json(`path parameter`);
});

/**
 * Request Body
 * - Lấy dữ liệu thông qua: request.body
 * - Cần cấu hình middleware app.use(express.json()) để parse JSON
 * - Thường dùng cho: dữ liệu phức tạp hoặc nhiều nhu form đăng ký, đăng nhập, tạo mới tài nguyên
 */
app.post(`/body`, (request, response, next) => {
   console.log(request.body);
   response.json(`body parameter`);
});

/**
 * Headers
 * - Lấy dữ liệu thông qua: request.headers
 * - Thường dùng cho: xác thực token (Authorization), meta thông tin (Content-Type, User-Agent)
 */
app.post(`/headers`, (request, response, next) => {
   console.log(request.headers);
   response.send(`headers parameter`);
});

// MYSQL2
const pool = mysql
   .createPool({
      host: `localhost`,
      user: `root`,
      password: `1234`,
      port: `3307`,
      database: `db_cyber_media`,
      timezone: `Z`,
   })
   .promise();

app.get(`/video-list`, async (req, res) => {
   const [result, fields] = await pool.query("SELECT * FROM videos");

   res.json(result);
});

// SEQUELIZE
const sequelize = new Sequelize(`db_cyber_media`, "root", "1234", {
   host: `localhost`,
   dialect: `mysql`,
   port: `3307`,
   logging: false,
});
sequelize
   .authenticate()
   .then(() => {
      console.log("Kết nối db thành công.");
   })
   .catch((error) => {
      console.error("Không thể kết nối với db:", error);
   });

const VideoType = sequelize.define(
   "video_type",
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
         allowNull: true, // Nếu cột này không bắt buộc có giá trị
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
         onUpdate: DataTypes.NOW, // Tự động cập nhật thời gian khi record thay đổi
      },
   },
   {
      // nếu không chỉ định tableName thì sequelize sẽ tự lấy modelName để thêm s vào
      tableName: "video_type",
      // Vì đã có `created_at` và `updated_at`
      timestamps: false,
   }
);

// force: false => chỉ tạo bảng nếu chưa tồn tại.
// force: true => sẽ xóa bảng nếu có và tạo mới
VideoType.sync({ force: false })
   .then(() => {
      console.log(`Bảng video_type đã được đồng bộ`);
   })
   .catch((error) => {
      console.error("Error syncing tables:", error);
   });

app.get(`/video-type`, async (req, res) => {
   const videoType = await VideoType.findAll({
      raw: true,
   });

   console.log(videoType);

   res.json(videoType);
});

const PORT = 3069;
app.listen(PORT, () => {
   console.log({ PORT: PORT, DOMAIN: `http://localhost:${PORT}` });
});
