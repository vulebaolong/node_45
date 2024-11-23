import { ApiProperty } from '@nestjs/swagger';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}

export default FileUploadDto;
