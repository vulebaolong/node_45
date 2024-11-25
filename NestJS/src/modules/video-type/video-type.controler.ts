import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VideoTypeService } from './video-type.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import CreateVideoTypeDto from './dto/create-video-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// export type TBodyCreateVideoType = {
//   type_name: string;
//   icon: string;
// };

@Controller('video')
@ApiTags(`Video-type`)
export class VideoTypeController {
  constructor(public videoTypeService: VideoTypeService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('video-type')
  async getVideoType(
    @Query(`page`) page: string,
    @Headers(`accessToken`) accessToken: string,
    @Req() req: Request,
  ) {
    // console.log({ page, accessToken });
    console.log({ user: req.user });
    return await this.videoTypeService.getVideoType();
  }

  @Get('video-type-detail/:id')
  async getDetailVideoType(@Param(`id`) videoTypeId: string) {
    console.log({ videoTypeId });
    return await this.videoTypeService.getDetailVideoType(videoTypeId);
  }

  @Post(`create-video-type`)
  async createVideoType(@Body() body: CreateVideoTypeDto) {
    console.log({ body });
    return await this.videoTypeService.createVideoType(body);
  }
}
