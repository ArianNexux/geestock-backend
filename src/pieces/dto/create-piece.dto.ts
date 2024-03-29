import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreatePieceDto {


    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(80)
    @ApiProperty({
        example: 'Frank',
    })
    name: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Armazem de vendas',
    })
    description: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1000,
    })
    price: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 10,
    })
    quantity: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 10,
    })
    target: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "10",
    })
    partNumber: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 10,
    })
    min: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '0001',
    })
    warehouseId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '0001',
    })
    categoryId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '001',
    })
    subCategoryId: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Teste, LDA',
    })
    supplierId: string


    @IsEnum({
        encomendada: "Removido",
        disponivel: "Disponivel"
    })
    @IsNotEmpty()
    @ApiProperty({
        example: 'Teste, LDA',
    })
    state: string


    @IsString()
    @ApiProperty({
        example: '001',
    })
    userId: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Teste, LDA',
    })
    brand_name: string

    @IsOptional()
    @ApiProperty({
        example: 'Na fila 5, do corredor do elevador 12',
    })
    locationInWarehouse: string


    @ApiProperty({
        example: 'Teste, LDA',
    })
    series_number: string

}


