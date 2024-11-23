import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import storageLocal from 'src/common/multer/upload-local.multer';
import storageCloud from 'src/common/multer/upload-cloud.multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import FileUploadDto from './dto/file-upload.dto';

@Controller('user')
@ApiTags(`Users`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(`avatar-local`)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageLocal,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  uploadAvatarLocal(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }

  @Post(`avatar-cloud`)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageCloud,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  uploadAvatarCloud(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }
}
