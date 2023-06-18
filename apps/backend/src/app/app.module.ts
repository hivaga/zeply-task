import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BtcConversionRatesController} from "./controllers/btc-conversion-rates/btc-convertion-rates.controller";
import {BtcSearchTransactionController} from "./controllers/btc-search-transaction/btc-search-transaction.controller";
import {BtcSearchController} from "./controllers/btc-search/btc-search.controller";
import {AxiosService} from "./services/axios/axios.service";
import {HttpModule} from "@nestjs/axios";

const API_CONTROLLERS = [AppController,
  BtcSearchController,
  BtcConversionRatesController,
  BtcSearchTransactionController]

@Module({
  imports: [HttpModule],
  controllers: [...API_CONTROLLERS],
  providers: [AppService, AxiosService],
})
export class AppModule {

}
