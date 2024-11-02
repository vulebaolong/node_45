import { BadRequestError, UnauthorizedError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenService from "./token.service.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";

const authService = {
   register: async (req) => {
      // Bước 1: nhận dữ liệu từ FE
      const { email, pass_word, full_name } = req.body;
      console.log({ email, pass_word, full_name });

      // Bước 2: kiểm tra email có tồn tại trong databsse
      //       - Nếu email tồn tại trả lỗi "Email đã tồn tại, vui lòng đăng nhập",
      //       - Nếu email chưa tồn tại: đi tiếp
      // SELECT * FROM users WHERE email = "vulebaolong@gmail.cpom"
      const userExists = await prisma.users.findFirst({
         where: {
            email: email,
         },
      });
      if (userExists) throw new BadRequestError(`Email đã tồn tại, vui lòng đăng nhập`);
      console.log({ userExists });

      // Bước 3: mã hoá password
      const hashPassword = bcrypt.hashSync(pass_word, 10);

      // Bước 4: tạo người dùng mới
      const userNew = await prisma.users.create({
         data: {
            email: email,
            full_name: full_name,
            pass_word: hashPassword,
         },
      });

      return userNew;
   },
   login: async (req) => {
      // Bước 1: nhận dữ liệu từ body
      const { email, pass_word } = req.body;
      console.log({ email, pass_word });

      // Bước 2: kiểm tra email có tồn tại trong db hay chưa
      //       - email tồn tại: đi tiếp
      //       - email chưa tồn tịa: trả lỗi "Email không tồn tại, vui lòng đăng ký"
      const userExists = await prisma.users.findFirst({
         where: {
            email: email,
         },
         select: {
            user_id: true,
            pass_word: true,
         },
      });
      if (!userExists) throw new BadRequestError("Email không tồn tại, vui lòng đăng ký");

      // Bước 3: kiểm tra password
      // sẽ không có pass_word bên trong userExists do đã ẩn đi ở src/common/prisma/init.prisma.js
      console.log({ userExists });
      const passHash = userExists.pass_word;
      const isPassword = bcrypt.compareSync(pass_word, passHash);
      if (!isPassword) throw new BadRequestError(`Mật khẩu không chính xác`);

      // Bước 4: tạo accessToken và RefreshToken
      const tokens = tokenService.createTokens(userExists);

      return tokens;
   },
   // Sau khi tạo ứng dụng thành công
   // Ở trang dashbord chọn Trường hợp ứng dụng
   // chọn tuỳ chỉnh
   // mục email => click thêm
   // lấy id ứng dụng (ở trang liệt kê các ứng dụng, hoặc trên url sau khi đã vào ứng dụng)
   loginFacebook: async (req) => {
      const { email, id, name, picture } = req.body;
      console.log({ email, id, name, picture });

      const userExists = await prisma.users.findFirst({
         where: {
            email: email,
         },
         select: {
            user_id: true,
            pass_word: true,
            full_name: true,
            avatar: true,
         },
      });

      if (userExists) {
         // hôm sau xử lý
         // gom tạo 2 token ra service token
         // mang khoá bí mật ra file env
         // tạo middlware protect
         //       - tạo class lỗi UnAuthorizedError
         //       - tạo class lỗi ForbiddenError
         // => send mail chào mừng với login

         // sẽ update nếu full_name, avatar chưa có
         await prisma.users.update({
            where: {
               user_id: userExists.user_id,
            },
            data: {
               full_name: userExists.full_name ? undefined : name,
               avatar: userExists.avatar ? undefined : picture.data.url,
            },
         });
      } else {
         // Người dùng chưa tồn tại tạo mới
         userExists = await prisma.users.create({
            data: {
               face_app_id: id,
               full_name: name,
               email: email,
               avatar: picture.data.url,
            },
         });
      }

      const tokens = tokenService.createTokens(userExists);

      return tokens;
   },
   refreshToken: async (req) => {
      console.log({
         headers: req.headers,
      });
      const refreshToken = req.headers?.authorization?.split(" ")[1];
      const accessToken = req.headers[`x-access-token`];

      console.log({ refreshToken, accessToken });
      if (!refreshToken) throw new UnauthorizedError();
      if (!accessToken) throw new UnauthorizedError();

      const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, { ignoreExpiration: true });

      if (decodeRefreshToken.user_id !== decodeAccessToken.user_id) throw new UnauthorizedError();

      const user = await prisma.users.findUnique({
         where: {
            user_id: decodeRefreshToken.user_id,
         },
      });

      const tokens = tokenService.createTokens(user);

      return tokens;
   },
};

export default authService;
