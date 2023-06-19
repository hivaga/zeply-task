import {Body, Controller, Post} from '@nestjs/common';
import {AxiosError} from "axios";
import {catchError, map} from "rxjs";
import {SearchBtcDto} from "../../model/dtos";
import {AxiosService} from "../../services/axios/axios.service";
import {BaseController} from "../base.controller";



@Controller('btc-search')
export class BtcSearchController extends BaseController {

  constructor(service: AxiosService) {
    super(service);
  }

  @Post()
  create(@Body() searchBtcDto: SearchBtcDto) {
    const {hash, type} = searchBtcDto;
    const url = `https://blockchain.info/rawaddr/${hash}?`;

    console.log('BtcSearchController', searchBtcDto);

    return this.service.get(url).pipe(
      map(response => response.data),
      catchError((error:AxiosError) => {
        console.error('BtcSearchController', error);
        throw this.createHttpException(error);
      }));
  }
}
