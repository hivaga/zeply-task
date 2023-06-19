import { Injectable } from '@nestjs/common';
import {Subject} from "rxjs";
import WebSocket from "ws";

@Injectable()
export class SocketService {

  public readonly onReceivedData = new Subject<Object>();

  private readonly socket = new WebSocket('wss://ws.blockchain.info/inv');

  constructor() {

    this.socket.on('open', () => {
      console.log('WebSocket connection established.');
    });

    this.socket.on('message', (data) => {
      try {
        const parsedData = JSON.parse(data.toString());
        console.log('Received socket message:', parsedData);
        this.onReceivedData.next(parsedData);
      }catch (error) {
        console.error('Json parse error of socket data');
      }
    });

    this.socket.on('close', () => {
      console.log('WebSocket connection closed.');
    });
  }

  send(data:string) {
    console.log('Send socket data:', data);
    this.socket.send(data);
  }

}
