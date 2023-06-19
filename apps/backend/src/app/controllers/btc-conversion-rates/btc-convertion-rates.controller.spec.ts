import {HttpModule} from "@nestjs/axios";
import { Test, TestingModule } from '@nestjs/testing';
import {AppService} from "../../app.service";
import {AxiosService} from "../../services/axios/axios.service";
import {BtcConversionRatesController} from "./btc-convertion-rates.controller";


describe('BtcConversionRatesController', () => {
  let controller: BtcConversionRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService, AxiosService],
      controllers: [BtcConversionRatesController],
    }).compile();

    controller = module.get<BtcConversionRatesController>(BtcConversionRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
