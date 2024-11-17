import { Module } from "@nestjs/common";
import { VideoTypeController } from "./video-type.controler";
import { VideoTypeService } from "./video-type.service";
import { PrismaService } from "src/common/prisma/prisma.service";

@Module({
   controllers: [VideoTypeController],
   providers: [VideoTypeService, PrismaService]
})
export class VideoTypeModule {}