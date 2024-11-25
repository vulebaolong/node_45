import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { ResponseSuccessInterceptor } from './common/interceptor/response-success.interceptor';
import { AllExceptionFilter } from './common/filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [`http://localhost:5173`],
  });
  // cho phép tất cả sử dụng BE
  // app.enableCors();

  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionFilter());
  // const logger = app.get(CustomLoggerService);
  // app.useLogger(logger);

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
