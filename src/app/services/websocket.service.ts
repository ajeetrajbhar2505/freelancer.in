import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socket: Socket;

  constructor() {
    this.initConnection(); // Initialize the WebSocket connection when the service is instantiated
  }

  // Initialize or reconnect the WebSocket connection
  private initConnection(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.socket = io(environment.hostURL, {
        transports: ['websocket'],
        query: {
          token: token
        }
      });
      console.log('Socket connection initialized');
    }
  }

// Send a message through the WebSocket connection
sendMessage(message: any, callback?: (acknowledgment: any) => void): void {
  this.socket.emit('message', message, callback);
}


// Listen for incoming messages
onMessage(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('message', (message: any) => {
      observer.next(message);
    });
  });
}

  
  // Handle errors in the WebSocket connection
  handleConnectionError(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('connect_error', (error: any) => {
        observer.error(error);
      });
    });
  }

  // Disconnect the WebSocket connection
  disconnect(): void {
    this.socket.disconnect();
  }
}
