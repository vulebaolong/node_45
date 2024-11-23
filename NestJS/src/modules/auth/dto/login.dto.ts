import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

class LoginDto {
  @ApiProperty()
  @IsString({ message: `Email phải là string` })
  @IsEmail(undefined, {message: `Email chưa hợp lệ`})
  email: string;

  @ApiProperty()
  @IsString({ message: `Password phải là string` })
  pass_word: string;
}

export default LoginDto;
