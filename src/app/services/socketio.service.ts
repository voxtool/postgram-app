import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket

  constructor() { }

  connect() {
      this.socket = io(/*'http://localhost:3000/'*/);   //remove comment if you are using it locally
  }

}
