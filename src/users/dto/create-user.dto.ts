import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bento Julio',
    description: `The name that will be used in your Profile`,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Frank, LDA.',
  })
  company: string;



  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example: ['b40e442d-61d3-43cd-8b9f-37578f7d3d7b'],
  })
  warehouseId: string[];


  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    example: 'Fulano@xyz.com.ao',
  })
  email: string;



  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  position: string
}
