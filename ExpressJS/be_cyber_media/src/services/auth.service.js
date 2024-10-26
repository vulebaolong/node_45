import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";

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
};

export default authService;
