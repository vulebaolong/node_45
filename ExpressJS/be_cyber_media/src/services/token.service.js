import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant.js";

const tokenService = {
   createTokens: (user) => {
      // để tăng trải nghiệm người dùng vì nếu không có token thì mỗi lần gọi api phải gửi email và password, thì thay vì vậy FE chỉ cần gửi token kèm theo mỗi api
      // chỉ để chứng mình rằng người dùng đã đăng nhập thành công
      // cho nên mình sẽ cấp token khi đã xử lý logic kiểm tra email, password thành công
      // => cấp token lúc login thành công
      const accessToken = jwt.sign({ user_id: user.user_id }, ACCESS_TOKEN_SECRET, {
         expiresIn: ACCESS_TOKEN_EXPIRES,
      });

      // refreshToken: sẽ có nhiệm vụ bảo vệ accessToken bằng cách làm mới, bởi vì mình sẽ giảm thời gian sống của access xuống mức thấp nhất
      //  khi giảm access xuống mức thấp nhất thì mình sẽ cần có refreshToken để làm mới, nếu không có refreshToken, thì khi access hết hạn người dùng phải đăng nhập lại
      //  mà nếu access có thời giạn quá thấp ví dụ 1s, thì cứ 1s người dùng đăng nhập lại
      //       - nếu hết hạn: trả 401 logout người dùng
      //       - nếu không hợp lệ (khoá bí mật): 401 logout người dùng
      const refreshToken = jwt.sign({ user_id: user.user_id }, REFRESH_TOKEN_SECRET, {
         expiresIn: REFRESH_TOKEN_EXPIRES,
      });

      return {
         accessToken: accessToken,
         refreshToken: refreshToken,
      };
   },
};

export default tokenService;
