import { Prisma, Pieces, InvoiceReciepment } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class InvoiceReciepmentDao {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: any): Promise<any> {
        return this.prisma.invoiceReciepment.create({
            data: {
                description: data.description,
                number_series: data.numberSeries,
                partNumber: data.partNumber,
                request: {
                    connect: {
                        id: data.requestPieceId
                    }
                }

            },


        });
    }

    async list(requestId: string): Promise<any[]> {
        if (requestId !== '') {

            const request = await this.prisma.invoiceReciepment.findMany({
                where: {
                    request: {
                        requestId
                    }
                },
                select: {
                    id: true,
                    partNumber: true,
                    number_series: true,
                    requestPiecesId: true,

                    request: {
                        select: {
                            id: true,
                            quantityGiven: true,

                            piece: {
                                select: {
                                    name: true,
                                    price: true,
                                    description: true,
                                    partNumber: true,
                                    quantity: true,

                                }
                            },
                            request: {
                                select: {
                                    id: true,
                                    name: true,
                                    numberPr: true,
                                    warehouseIncomming: {
                                        select: {
                                            name: true
                                        }
                                    },
                                    warehouseOutcomming: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            },


                        }
                    }
                }
            });

            return request;
        }
        const request = await this.prisma.invoiceReciepment.findMany({
            select: {
                id: true,
                partNumber: true,
                number_series: true,
                requestPiecesId: true,

                request: {
                    select: {
                        id: true,
                        quantityGiven: true,
                        piece: {
                            select: {
                                name: true,
                                price: true,
                                description: true,
                                partNumber: true,
                                quantity: true,
                            }
                        },
                        request: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },


                    }
                }
            }
        });

        return request;
    }

    async find(id: string): Promise<any> {
        return this.prisma.invoiceReciepment.findFirst({
            where: { id },

        });
    }

    async update(id: string, data: any): Promise<any> {
        const request = this.prisma.invoiceReciepment.update({ where: { id }, data });
        return request
    }

    async delete(id: string): Promise<any> {
        return this.prisma.invoiceReciepment.delete({ where: { id } });
    }

}
