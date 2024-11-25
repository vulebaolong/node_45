import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorater/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('protect') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log(`canActivate`);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log(`handleRequest`);
   //  console.log({ err, user, info });

    if (info instanceof TokenExpiredError) throw new ForbiddenException();
    if (info instanceof JsonWebTokenError) throw new UnauthorizedException();

    return user;
  }
}
