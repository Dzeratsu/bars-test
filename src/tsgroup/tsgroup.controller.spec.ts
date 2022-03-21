import { Test, TestingModule } from '@nestjs/testing';
import { TsgroupController } from './tsgroup.controller';

describe('TsgroupController', () => {
  let controller: TsgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TsgroupController],
    }).compile();

    controller = module.get<TsgroupController>(TsgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
