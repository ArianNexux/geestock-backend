import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoryDao } from './subcategory.dao';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
@Injectable()
export class SubcategoryService {
  constructor(private subcategoriesDao: SubcategoryDao) { }
  async create(createSubcategoryDto: CreateSubcategoryDto) {
    await this.subcategoriesDao.create({
      categoryId: createSubcategoryDto.categoryId,
      name: createSubcategoryDto.name,
      code: createSubcategoryDto.code
    });
  }

  async findAll() {
    const subcategories = await this.subcategoriesDao.list();
    const subcategoriesToReturn = subcategories.map(e => ({
      id: e.id,
      name: e.name,
      code: e.code,
      category: e.category,
      created_at: e.created_at,
      updated_at: e.updated_at
    }))
    return subcategoriesToReturn;
  }

  async findOne(id: string) {
    await this.subcategoriesDao.find(id);
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    await this.subcategoriesDao.update(id, updateSubcategoryDto);
  }

  async remove(id: string) {
    await this.subcategoriesDao.delete(id);
  }
}
