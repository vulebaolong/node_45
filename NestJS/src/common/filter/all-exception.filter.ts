import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { responseError } from '../helpers/response.helper';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = 500;
    let message = `Internal Server Error`;

    //  Khu vực lỗi kiểm soát được
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

   //  console.log({ exception });
    const result = responseError(message, status, exception?.stack);

    response.status(status).json(result);
  }
}
