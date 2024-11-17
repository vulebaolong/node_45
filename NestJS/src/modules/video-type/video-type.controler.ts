import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { VideoTypeService } from './video-type.service';
import { Request } from 'express';

export type TBodyCreateVideoType = {
  type_name: string;
  icon: string;
};

@Controller('video')
export class VideoTypeController {
  constructor(public videoTypeService: VideoTypeService) {}

  @Get('video-type')
  async getVideoType(
    @Query(`page`) page: string,
    @Headers(`accessToken`) accessToken: string,
    @Req() req: Request,
  ) {
    console.log({ page, accessToken });
    // console.log({ req });
    return await this.videoTypeService.getVideoType();
  }

  @Get('video-type-detail/:id')
  async getDetailVideoType(@Param(`id`) videoTypeId: string) {
    console.log({ videoTypeId });
    return await this.videoTypeService.getDetailVideoType(videoTypeId);
  }

  @Post(`create-video-type`)
  async createVideoType(@Body() body: TBodyCreateVideoType) {
    console.log({ body });
    return await this.videoTypeService.createVideoType(body);
  }
}
