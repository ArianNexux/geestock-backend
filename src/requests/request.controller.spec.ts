import { Test, TestingModule } from '@nestjs/testing';
import { PieceController } from './request.controller';
import { PieceService } from './request.service';

describe('PieceController', () => {
  let controller: PieceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PieceController],
      providers: [PieceService],
    }).compile();

    controller = module.get<PieceController>(PieceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
