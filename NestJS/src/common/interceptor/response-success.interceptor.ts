import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { responseSuccess } from '../helpers/response.helper';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE } from '../decorater/response-message.decorator';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log({ data });

        const message = this.reflector.getAllAndOverride<string>(
          RESPONSE_MESSAGE,
          [context.getHandler(), context.getClass()],
        );

        console.log({ message });

        const result = responseSuccess(data, message);
        return result;
      }),
    );
  }
}
