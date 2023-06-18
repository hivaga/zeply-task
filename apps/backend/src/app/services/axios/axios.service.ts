import {HttpService} from "@nestjs/axios";
import {Injectable} from '@nestjs/common';

@Injectable()
export class AxiosService {
  constructor(private httpService: HttpService) {
  }

  get(url:string){
    return this.httpService.get(url);
  }

  post(url, data){
    return this.httpService.post(url, data);
  }
}
