import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class CreateVideoTypeDto {
  @IsString({ message: `Trường type_name phải là string` })
  @ApiProperty({
   type: String, // Phải để là String thay vì `number`
   description: `Tên loại, phải là chuỗi`,
   default: 'default_type', // Nếu cần, thêm giá trị mặc định
 })
  type_name: string;

  @IsString({ message: `Trường icon phải là string` })
  icon: string;
}

export default CreateVideoTypeDto;
