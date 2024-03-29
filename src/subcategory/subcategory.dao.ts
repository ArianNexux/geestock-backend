import { Prisma, SubCategories } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { ListSubcategoryDto } from './dto/list-subcategory.dto';

@Injectable()
export class SubcategoryDao {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: any): Promise<any> {

        return this.prisma.subCategories.create({
            data: {
                name: data.name,
                code: data.code,
                category: {
                    connect: { id: data.categoryId }
                }
            },
        });

    }

    async list(searchParam: string): Promise<ListSubcategoryDto[]> {
        if (searchParam !== "" && searchParam !== undefined) {
            const subcategory = await this.prisma.subCategories.findMany({
                where: {
                    OR: [
                        {
                            code: {
                                contains: searchParam,
                            },
                        },
                        {
                            name: {
                                contains: searchParam,
                            },
                        },
                    ]
                },
                include: {
                    category: true
                },
                orderBy: {
                    created_at: 'desc'
                }
            });

            return subcategory
        }
        const subcategory = await this.prisma.subCategories.findMany({
            include: {
                category: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return subcategory
    }

    async find(id: string): Promise<SubCategories | null> {
        return this.prisma.subCategories.findFirst({
            where: { id }, include: {
                category: true
            }
        });
    }

    async findByCategory(id: string): Promise<ListSubcategoryDto[]> {
        const subcategory = this.prisma.subCategories.findMany({
            where: {
                categoryId: id
            }, include: {
                category: true
            }
        });

        return subcategory
    }


    async update(id: string, data: SubCategories): Promise<SubCategories> {
        const user = this.prisma.subCategories.update({ where: { id }, data });
        return user
    }

    async delete(id: string): Promise<SubCategories> {
        return this.prisma.subCategories.delete({ where: { id } });
    }
}
