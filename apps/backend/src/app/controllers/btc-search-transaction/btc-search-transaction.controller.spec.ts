import { Test, TestingModule } from '@nestjs/testing';
import { BtcSearchTransactionController } from './btc-search-transaction.controller';

describe('BtcSearchTransactionController', () => {
  let controller: BtcSearchTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcSearchTransactionController],
    }).compile();

    controller = module.get<BtcSearchTransactionController>(BtcSearchTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
