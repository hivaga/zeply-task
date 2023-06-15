import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {SearchBtcController} from "./controllers/search-btc/search-btc.controller";
import {BlockchainApiService} from "./services/blockchain-api/blockchain-api.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [AppController, SearchBtcController],
  providers: [AppService, BlockchainApiService],
})
export class AppModule {

}
