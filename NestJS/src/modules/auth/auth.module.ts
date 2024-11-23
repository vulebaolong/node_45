import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
