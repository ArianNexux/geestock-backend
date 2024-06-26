import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Subcategory } from './entities/subcategory.entity';

@ApiTags('Subcategory')
@Controller('api/subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) { }

  @ApiCreatedResponse({
    description: 'Subcategory registered successfully',
    type: Subcategory,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.create(createSubcategoryDto);
  }


  @ApiQuery({
    name: "searchParam",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "onlyActive",
    type: Number,
    required: false
  })
  @Get()
  findAll(@Query('searchParam') searchParam: string, @Query('onlyActive') onlyActive: number) {
    return this.subcategoryService.findAll(searchParam, onlyActive);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(id);
  }
  @Get(':id')
  findByCategory(@Param('id') id: string) {
    return this.subcategoryService.findByCategory(id);
  }


  @ApiBearerAuth()

  @ApiBody({ type: UpdateSubcategoryDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove(id);
  }

  @Get('change-status/:id')
  changeStatus(@Param('id') id: string, @Query('status') status: number) {
    return this.subcategoryService.changeStatus(id, status);
  }
}
