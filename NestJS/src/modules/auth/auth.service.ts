import { BadRequestException, Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';
import { ConfigService } from '@nestjs/config';

type TUserExists = {
  pass_word: string;
  user_id: number;
};

@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    private jwtService: JwtService,
    public configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    // Lỗi kiểm soát được
    throw new BadRequestException(`Lỗi kiểm soát được`);
    // Lỗi không kiểm soát được
    // throw new Error(`Lỗi không kiểm soát được`)

    // Bước 1: nhận dữ liệu từ body
    const { email, pass_word } = loginDto;
    console.log({ email, pass_word });

    // Bước 2: kiểm tra email có tồn tại trong db hay chưa
    //       - email tồn tại: đi tiếp
    //       - email chưa tồn tịa: trả lỗi "Email không tồn tại, vui lòng đăng ký"
    const userExists = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        user_id: true,
        pass_word: true,
      },
    });
    if (!userExists)
      throw new BadRequestException('Email không tồn tại, vui lòng đăng ký');

    // Bước 3: kiểm tra password
    // sẽ không có pass_word bên trong userExists do đã ẩn đi ở src/common/prisma/init.prisma.js
    console.log({ userExists });
    const passHash = userExists.pass_word;
    const isPassword = bcrypt.compareSync(pass_word, passHash);
    if (!isPassword) throw new BadRequestException(`Mật khẩu không chính xác`);

    // Bước 4: tạo accessToken và RefreshToken
    const tokens = this.createTokens(userExists);

    return tokens;
  }

  createTokens(userExists: TUserExists) {
    console.log({
      ACCESS_TOKEN_SECRET: this.configService.get<string>(
        'ACCESS_TOKEN_SECRET',
      ),
    });
    const accessToken = this.jwtService.sign(
      { user_id: userExists.user_id },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { user_id: userExists.user_id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
      },
    );
    return { accessToken, refreshToken };
  }
}
