import {Body, Controller, Post} from '@nestjs/common';
import {BlockchainApiService} from "../../services/blockchain-api/blockchain-api.service";


interface SearchBtcDto {
  hash: string,
  type: 'address' | 'transaction'
}

@Controller('search-btc')
export class SearchBtcController {

  constructor(public service: BlockchainApiService) {
  }
  @Post()
  create(@Body() searchBtcDto: SearchBtcDto) {
    const {hash, type} = searchBtcDto;
    console.log('search-btc', searchBtcDto);
    return this.service.getAddressBalance(hash);
  }

}
