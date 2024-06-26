import { ApiParam, PartialType } from '@nestjs/swagger';
import { CreatePieceDto } from './create-piece.dto';
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Exclude } from 'class-transformer';

export class UpdatePieceDto extends PartialType(CreatePieceDto) {
    @IsString()
    @IsNotEmpty()

    @ApiProperty({
        example: 'Frank, LDA.',
    })
    id: string


    @ApiProperty({
        example: '001',
    })
    userId: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    isActive: boolean

    @Exclude()
    created_at: Date
    @Exclude()
    updated_at: Date
}
