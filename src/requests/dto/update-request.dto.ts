import { ApiParam, PartialType } from '@nestjs/swagger';
import { CreateRequestDTO } from './create-request.dto';
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Exclude } from 'class-transformer';

export class UpdateRequestDTO extends CreateRequestDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Frank, LDA.',
    })
    id: string
    @IsNotEmpty()
    @ApiProperty({
        example: 'Frank, LDA.',
    })
    name: string

    @IsNotEmpty()
    @ApiProperty({
        example: '001',
    })
    numberPr: string

    @IsOptional()
    @ApiProperty({
        example: "10",
        default: "Disponivel"
    })
    state: string

    @Exclude()
    created_at: Date
    @Exclude()
    updated_at: Date
}
