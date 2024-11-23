import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import CreateVideoTypeDto from './dto/create-video-type.dto';

@Injectable()
export class VideoTypeService {
  constructor(public prisma: PrismaService) {}

  async getVideoType() {
    const videoTypes = await this.prisma.video_type.findMany();
    return videoTypes;
  }

  async getDetailVideoType(videoTypeId: string) {
    const videoTypeDetail = await this.prisma.video_type.findFirst({
      where: {
        type_id: Number(videoTypeId),
      },
    });
    return videoTypeDetail;
  }

  async createVideoType(body: CreateVideoTypeDto) {
    const videpTypeNew = await this.prisma.video_type.create({
      data: {
        type_name: body.type_name,
        icon: body.icon,
      },
    });
    return videpTypeNew;
  }
}
