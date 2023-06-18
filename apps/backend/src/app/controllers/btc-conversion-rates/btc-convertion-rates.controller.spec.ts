import { Test, TestingModule } from '@nestjs/testing';
import {BtcConversionRatesController} from "./btc-convertion-rates.controller";


describe('BtcConversionRatesController', () => {
  let controller: BtcConversionRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcConversionRatesController],
    }).compile();

    controller = module.get<BtcConversionRatesController>(BtcConversionRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
