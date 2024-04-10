import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: Socket;

  constructor() { 
    this.socket = io(environment.apiURL, {
      transports: ['websocket']
    });
  }

  getMessage(room: string, callback: (data: any) => void) {
    this.socket.on(room, callback);
  }

  sendMessage(room: string, message: any) {
    this.socket.emit(room, message);
  }
}
