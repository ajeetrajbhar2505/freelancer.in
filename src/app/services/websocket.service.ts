import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket;

  constructor() { 
    this.socket = io(environment.hostURL, {
      transports: ['websocket']
    });
    const token = localStorage.getItem('token');
    this.socket.io.opts.query = {
      token: token
    };
  }

  getMessage(room: string, callback: (data: any) => void) {
    this.socket.on(room, callback);
  }

  sendMessage(room: string, message: any) {
    this.socket.emit(room, message);
  }
}
