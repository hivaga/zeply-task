import { Test, TestingModule } from '@nestjs/testing';
import { BtcSearchController } from './btc-search.controller';

describe('BtcSearchController', () => {
  let controller: BtcSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcSearchController],
    }).compile();

    controller = module.get<BtcSearchController>(BtcSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
