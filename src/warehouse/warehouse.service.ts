import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseDao } from './warehouse.dao';

import { LogsActivitiesDao } from 'src/logs-activities/logs-activities.dao';
@Injectable()
export class WarehouseService {
  constructor(
    private warehousesDao: WarehouseDao,
    private logsActivitiesDao: LogsActivitiesDao
  ) { }
  async create(createWarehouseDto: CreateWarehouseDto) {

    createWarehouseDto.capacity = Number(createWarehouseDto.capacity)
    await this.logsActivitiesDao.create({
      userId: createWarehouseDto.userId,
      description: `Criou o armazem ${createWarehouseDto.name} com o codigo ${createWarehouseDto.code}`
    })

    delete createWarehouseDto.userId
    await this.warehousesDao.create(createWarehouseDto);
  }

  async findAll(searchParam: string, onlyActive: number) {
    const warehouses = await this.warehousesDao.list(searchParam, onlyActive);
    const warehousesToReturn = warehouses.map(e => ({
      id: e.id,
      name: e.name,
      description: e.description,
      country: e.country,
      province: e.province,
      isActive: e.isActive,
      address: e.address,
      code: e.code,
      type: e.type,
      capacity: e.capacity,
      company: e.company,
      embarcationType: e.embarcationType,
      flag: e.flag,
      created_at: e.created_at,
      updated_at: e.updated_at
    }))
    return warehousesToReturn;
  }

  async findOne(id: string) {
    return await this.warehousesDao.find(id);
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    await this.logsActivitiesDao.create({
      userId: updateWarehouseDto.userId,
      description: `Actualizou o armazem ${updateWarehouseDto.name} com o codigo ${updateWarehouseDto.code}`
    })
    delete updateWarehouseDto.userId

    await this.warehousesDao.update(id, updateWarehouseDto);
  }

  async remove(id: string) {
    await this.warehousesDao.delete(id);
  }

  async changeStatus(id: string, status: number) {
    await this.warehousesDao.changeStatus(id, status);
  }
}
