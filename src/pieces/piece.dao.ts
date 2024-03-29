import { Prisma, Pieces } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LogsActivitiesDao } from 'src/logs-activities/logs-activities.dao';

@Injectable()
export class PieceDao {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(data: any): Promise<any> {

        return this.prisma.pieces.create({ data });

    }

    async list(searchParam?: string): Promise<any> {
        let pieces: any;
        if (searchParam !== "" && searchParam !== undefined) {
            pieces = await this.prisma.pieces.findMany({
                orderBy: {
                    created_at: 'desc'
                },
                where: {
                    OR: [
                        {
                            partNumber: {
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
                select: {
                    brand_name: true,
                    id: true,
                    description: true,
                    locationInWarehouse: true,
                    partNumber: true,
                    name: true,
                    price: true,
                    state: true,
                    target: true,
                    min: true,
                    quantity: true,
                    warehouse: {
                        select: {
                            name: true
                        }
                    }
                }

            });
        } else {

            pieces = await this.prisma.pieces.findMany({
                orderBy: {
                    created_at: 'desc'
                },
                select: {
                    brand_name: true,
                    id: true,
                    description: true,
                    locationInWarehouse: true,
                    partNumber: true,
                    name: true,
                    price: true,
                    state: true,
                    target: true,
                    min: true,
                    quantity: true,
                    warehouse: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        }

        return pieces;
    }

    async find(id: string): Promise<Pieces | null> {
        return this.prisma.pieces.findFirst({
            where: { id },
            include: {
                category: true,
                subcategory: true,
                supplier: true,
                warehouse: true
            },
        });
    }

    async update(id: string, data: Pieces): Promise<Pieces> {
        const piece = this.prisma.pieces.update({ where: { id }, data });
        return piece
    }

    async delete(id: string): Promise<Pieces> {
        return this.prisma.pieces.delete({ where: { id } });
    }

    async increaseQuantity(id: string, quantity: number): Promise<Pieces> {
        const pieceFound = await this.find(id)
        const piece = this.prisma.pieces.update({
            where: { id },
            data: {
                quantity: pieceFound.quantity + quantity
            }
        });

        return piece
    }

    async updateQuantity(id: string, quantity: number): Promise<Pieces> {
        const piece = this.prisma.pieces.update({
            where: { id },
            data: {
                quantity: quantity
            }
        });
        return piece
    }

    async updatePrice(id: string, newPrice: number): Promise<Pieces> {
        const piece = this.prisma.pieces.update({
            where: { id }, data: {
                price: newPrice
            }
        });
        return piece
    }

    async updateWarehouse(id: string, warehouse: string): Promise<any> {
        const piece = await this.prisma.pieces.update({
            where: { id },
            data: {
                warehouseId: warehouse
            }
        });
        return piece
    }

    async findByWarehouseId(warehouseId: string, searchParam: string): Promise<any> {
        console.log(warehouseId, searchParam);
        if (searchParam !== "" && searchParam !== undefined) {
            const piecesByWarehouse = await this.prisma.pieces.findMany({
                where: {
                    AND: [
                        { warehouseId },
                        {
                            OR: [
                                {
                                    partNumber: {
                                        contains: searchParam,
                                    },
                                },
                                {
                                    name: {
                                        contains: searchParam,
                                    },
                                },
                            ]
                        }
                    ]
                },
                orderBy: {
                    created_at: 'desc'
                }
            })
            return piecesByWarehouse
        }
        const piecesByWarehouse = await this.prisma.pieces.findMany({
            where: { warehouseId },
            orderBy: {
                created_at: 'desc'
            }
        })
        console.log(piecesByWarehouse)
        return piecesByWarehouse
    }

    async findByPartNumberAndWarehouse(warehouseId: string, partNumber: string) {
        const piecesByWarehousePartNumber = await this.prisma.pieces.findFirst({
            where: {
                warehouseId,
                partNumber
            }
        })
        return piecesByWarehousePartNumber
    }

    async count(): Promise<any> {
        return this.prisma.pieces.count();
    }
}
