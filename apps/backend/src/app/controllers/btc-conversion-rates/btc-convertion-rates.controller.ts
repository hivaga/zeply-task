import {Controller, Get} from '@nestjs/common';
import {BlockchainApiService} from "../../services/blockchain-api/blockchain-api.service";



@Controller('btc-conversion-rates')
export class BtcConversionRatesController {

  constructor(public service: BlockchainApiService) {
  }
  @Get()
  create() {
    return this.service.getConversionRates();
  }

}
