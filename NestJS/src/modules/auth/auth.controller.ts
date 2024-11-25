import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorater/public.decorator';
import { ResponseMessage } from 'src/common/decorater/response-message.decorator';
import { CustomLoggerService } from '../logger/logger.service';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';

@Controller('auth')
// @UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    public logger: CustomLoggerService,
  ) {}

  @Public()
  @ResponseMessage(`Đăng nhập thành công`)
  @Post(`login`)
  login(@Body() loginDto: LoginDto) {
    this.logger.log(`hello world`);
    return this.authService.login(loginDto);
  }
}
