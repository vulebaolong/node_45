import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [`http://localhost:5173`],
    
  });
  // cho phép tất cả sử dụng BE
  // app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

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
