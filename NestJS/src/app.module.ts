import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoTypeModule } from './modules/video-type/video-type.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    VideoTypeModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
