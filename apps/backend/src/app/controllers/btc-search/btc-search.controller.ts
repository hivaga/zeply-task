import {Body, Controller, Post} from '@nestjs/common';
import {BlockchainApiService} from "../../services/blockchain-api/blockchain-api.service";


interface SearchBtcDto {
  hash: string,
  type: 'address' | 'transaction'
}

@Controller('btc-search')
export class BtcSearchController {

  constructor(public service: BlockchainApiService) {
  }
  @Post()
  create(@Body() searchBtcDto: SearchBtcDto) {
    const {hash, type} = searchBtcDto;
    console.log('BtcSearchController', searchBtcDto);
    return this.service.getAddressBalance(hash);
  }

}
