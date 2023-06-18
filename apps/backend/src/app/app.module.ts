import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BtcConversionRatesController} from "./controllers/btc-conversion-rates/btc-convertion-rates.controller";
import {BtcSearchController} from "./controllers/btc-search/btc-search.controller";
import {AxiosService} from "./services/axios/axios.service";
import {HttpModule} from "@nestjs/axios";

const API_CONTROLLERS = [AppController, BtcSearchController, BtcConversionRatesController]

@Module({
  imports: [HttpModule],
  controllers: [...API_CONTROLLERS],
  providers: [AppService, AxiosService],
})
export class AppModule {

}
