import {HttpModule} from "@nestjs/axios";
import { Test, TestingModule } from '@nestjs/testing';
import {AppService} from "../../app.service";
import {AxiosService} from "../../services/axios/axios.service";
import { BtcSearchController } from './btc-search.controller';

describe('BtcSearchController', () => {
  let controller: BtcSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService, AxiosService],
      controllers: [BtcSearchController],
    }).compile();

    controller = module.get<BtcSearchController>(BtcSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
