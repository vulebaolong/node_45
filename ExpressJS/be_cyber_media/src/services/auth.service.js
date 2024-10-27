import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      // để tăng trải nghiệm người dùng vì nếu không có token thì mỗi lần gọi api phải gửi email và password, thì thay vì vậy FE chỉ cần gửi token kèm theo mỗi api
      // chỉ để chứng mình rằng người dùng đã đăng nhập thành công
      // cho nên mình sẽ cấp token khi đã xử lý logic kiểm tra email, password thành công
      // => cấp token lúc login thành công
      const accessToken = jwt.sign({ user_id: userExists.user_id }, "ACCESSTOKEN_KHOA_BI_MAT", {
         expiresIn: "15m",
      });

      // refreshToken: sẽ có nhiệm vụ bảo vệ accessToken bằng cách làm mới, bởi vì mình sẽ giảm thời gian sống của access xuống mức thấp nhất
      //  khi giảm access xuống mức thấp nhất thì mình sẽ cần có refreshToken để làm mới, nếu không có refreshToken, thì khi access hết hạn người dùng phải đăng nhập lại
      //  mà nếu access có thời giạn quá thấp ví dụ 1s, thì cứ 1s người dùng đăng nhập lại
      //       - nếu hết hạn: trả 401 logout người dùng
      //       - nếu không hợp lệ (khoá bí mật): 401 logout người dùng
      const refreshToken = jwt.sign({ user_id: userExists.user_id }, "REFRESHTOKEN_KHOA_BI_MAT", {
         expiresIn: "7d",
      });

      return {
         accessToken: accessToken,
         refreshToken: refreshToken,
      };
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
         },
      });

      if (userExists) {
         // hôm sau xử lý 
      } else {
         // Người dùng chưa tồn tại tạo mới
         await prisma.users.create({
            data: {
               face_app_id: id,
               full_name: name,
               email: email,
               avatar: picture.data.url,
            },
         });
      }

      const accessToken = jwt.sign({ user_id: userExists.user_id }, "ACCESSTOKEN_KHOA_BI_MAT", {
         expiresIn: "15m",
      });
      const refreshToken = jwt.sign({ user_id: userExists.user_id }, "REFRESHTOKEN_KHOA_BI_MAT", {
         expiresIn: "7d",
      });

      return { accessToken, refreshToken };
   },
};

export default authService;
