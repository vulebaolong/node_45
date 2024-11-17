import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/**
 * - lệnh tạo tự động
 *    - nest g module modules/ten_module
 *    - nest g controller modules/ten_module
 *    - nest g service modules/ten_module
 * 
 *  nest g resource modules/user
 */
