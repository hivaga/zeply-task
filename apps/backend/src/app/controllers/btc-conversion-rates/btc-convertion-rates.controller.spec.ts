import { Test, TestingModule } from '@nestjs/testing';
import { BtcConvertionRatesController } from './btc-convertion-rates.controller';

describe('SearchBtcController', () => {
  let controller: BtcConvertionRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcConvertionRatesController],
    }).compile();

    controller = module.get<BtcConvertionRatesController>(BtcConvertionRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
