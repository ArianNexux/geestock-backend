import { Injectable } from '@nestjs/common';
import { OrderDao } from '../orders/order.dao';
import { PieceDao } from '../pieces/piece.dao';
import { RequestDao } from '../requests/request.dao';
import { WarehouseDao } from '../warehouse/warehouse.dao';
import { PieceService } from 'src/pieces/piece.service';


@Injectable()
export class DashboardService {
    constructor(
        private requestDao: RequestDao,
        private warehouseDao: WarehouseDao,
        private orderDao: OrderDao,
        private pieceDao: PieceDao,
        private pieceService: PieceService
    ) {

    }
    async findAll() {
        const price = await this.pieceService.findAll("", 1, 1)
        let totalPrice = price.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
            0,
        )
        const result = {
            request: await this.requestDao.count(undefined),
            warehouse: await this.warehouseDao.count(),
            order: await this.orderDao.count(undefined),
            piece: await this.pieceDao.count(undefined),
            totalPrice,
        }

        return result
    }

    async findAllByUser(warehouseId: string) {
        const price = await this.pieceService.findByWarehouse(warehouseId, "")
        let totalPrice = price.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalPrice,
            0,
        )
        const result = {
            request: await this.requestDao.count(warehouseId),
            warehouse: 0,
            order: await this.orderDao.count(warehouseId),
            piece: await this.pieceDao.count(warehouseId),
            totalPrice,
        }

        return result
    }
}
