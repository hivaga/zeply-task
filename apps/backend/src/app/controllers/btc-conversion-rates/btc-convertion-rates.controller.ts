import {Controller, Get} from '@nestjs/common';
import {AxiosError} from "axios";
import {catchError, map} from "rxjs";
import {AxiosService} from "../../services/axios/axios.service";
import {BaseController} from "../base.controller";


@Controller('btc-conversion-rates')
export class BtcConversionRatesController extends BaseController{

  constructor(service: AxiosService) {
    super(service);
  }

  @Get()
  create() {

    const url = `https://blockchain.info/ticker`;

    console.log('BtcConversionRatesController', url);

    return this.service.get(url).pipe(
      map(response => response.data),
      catchError((error:AxiosError) => {
        console.error('BtcConversionRatesController', error);
        throw this.createHttpException(error);
      }));

  }

}
