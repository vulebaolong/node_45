import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(protected appService: AppService) {}


  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
