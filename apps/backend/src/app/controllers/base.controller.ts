import {HttpStatus, HttpException} from "@nestjs/common";
import {AxiosError} from "axios";
import {AxiosService} from "../services/axios/axios.service";

export abstract class BaseController{

  constructor(public service: AxiosService) {}

  createHttpException(error:AxiosError){

    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = (error.message ?? error.response.data['message']) ?? 'Something went wrong';
      return new HttpException(errorMessage, statusCode);
    }

    return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

  }

}
