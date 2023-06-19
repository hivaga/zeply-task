import {HttpModule} from "@nestjs/axios";
import { Test, TestingModule } from '@nestjs/testing';
import {Subject} from "rxjs";
import {AppService} from "../../app.service";
import {AxiosService} from "../../services/axios/axios.service";
import {SocketService} from "../../services/socket-service/socket.service";
import {BtcAddressSubscribeController} from "./btc-address-subscribe.controller";


export class SocketServiceMock {

  public readonly onReceivedData = new Subject<Object>();
  send(data:string) {}

}

describe('BtcAddressSubscribeController', () => {
  let controller: BtcAddressSubscribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService, AxiosService, {provide: SocketService, useClass: SocketServiceMock}],
      controllers: [BtcAddressSubscribeController],
    }).compile();

    controller = module.get<BtcAddressSubscribeController>(BtcAddressSubscribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
