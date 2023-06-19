import {HttpModule} from "@nestjs/axios";
import { Test, TestingModule } from '@nestjs/testing';
import {AppService} from "../../app.service";
import {AxiosService} from "../../services/axios/axios.service";
import { BtcSearchTransactionController } from './btc-search-transaction.controller';

describe('BtcSearchTransactionController', () => {
  let controller: BtcSearchTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService, AxiosService],
      controllers: [BtcSearchTransactionController],
    }).compile();

    controller = module.get<BtcSearchTransactionController>(BtcSearchTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
