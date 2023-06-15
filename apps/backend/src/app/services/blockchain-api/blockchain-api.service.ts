import {Injectable} from '@nestjs/common';
import {map} from "rxjs";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class BlockchainApiService {
  constructor(private httpService: HttpService) {}

  getAddressBalance(address:string) {
    // https://www.blockchain.com/explorer/api/blockchain_api
    const url = `https://blockchain.info/q/addressbalance/${address}?confirmations=confirmations`
    return this.httpService.get(url).pipe(map(response => response.data));
  }

  getTransactions(address:string) {
    const url = `https://blockchain.info/q/addressbalance/${address}?confirmations=confirmations`
    return this.httpService.get(url).pipe(map(response => response.data));
  }
}
