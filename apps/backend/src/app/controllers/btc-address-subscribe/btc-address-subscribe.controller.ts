import {Body, Controller, Post} from '@nestjs/common';
import {BtcAddressSubscribeDto} from "../../model/dtos";
import {AxiosService} from "../../services/axios/axios.service";
import {SocketService} from "../../services/socket-service/socket.service";
import {BaseController} from "../base.controller";


@Controller('btc-address-subscribe')
export class BtcAddressSubscribeController extends BaseController {

  public subscribedList: string[] = [];

  constructor(service: AxiosService, public readonly socketService: SocketService) {
    super(service);
  }

  @Post()
  create(@Body() subscribeDTO: BtcAddressSubscribeDto) {

    console.log('BtcAddressSubscribeController', subscribeDTO);

    const receivedList = subscribeDTO.addresses ?? [];
    const unsubscribeList = this.subscribedList.filter(address => !receivedList.includes(address));
    const existingList = this.subscribedList.filter(address => receivedList.includes(address));
    const newList = receivedList.filter(address => !existingList.includes(address));


    unsubscribeList.forEach(address => {
      const data = {op: "addr_unsub", addr: address};
      const stringData = JSON.stringify(data);
      this.socketService.send(stringData);
    })

    newList.forEach(address => {
      const data = {op: "addr_sub", addr: address};
      const stringData = JSON.stringify(data);
      this.socketService.send(stringData);
    })

    return {newList, unsubscribeList};

  }

}
