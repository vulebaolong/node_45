import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoTypeModule } from './modules/video-type/video-type.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [VideoTypeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
