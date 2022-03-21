import { Test, TestingModule } from '@nestjs/testing';
import { TsgroupService } from './tsgroup.service';

describe('TsgroupService', () => {
  let service: TsgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TsgroupService],
    }).compile();

    service = module.get<TsgroupService>(TsgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
