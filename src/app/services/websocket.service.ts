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
   initConnection(): void {
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

// Send a message through the WebSocket connection that you are calling
startCall(message: any, callback?: (acknowledgment: any) => void): void {
  this.socket.emit('call', message, callback);
}

// Send a message through the WebSocket connection that you are calling
sendRequest(message: any, callback?: (acknowledgment: any) => void): void {
  this.socket.emit('handlerequests', message, callback);
}

// Send a message through the WebSocket connection that you are calling
accept(message: any, callback?: (acknowledgment: any) => void): void {
  this.socket.emit('accept', message, callback);
}


// Send a message through the WebSocket connection that you are calling
declineCall(message: any, callback?: (acknowledgment: any) => void): void {
  this.socket.emit('decline', message, callback);
}

// Listen for incoming messages
onMessage(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('message', (message: any) => {
      observer.next(message);
    });
  });
}

// Listen for incoming calls
onIncomingCall(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('call', (message: any) => {
      observer.next(message);
    });
  });
}


// Listen for incoming calls
onAccept(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('accept', (message: any) => {
      observer.next(message);
    });
  });
}


// Listen for incoming calls
onDeclineCall(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('decline', (message: any) => {
      observer.next(message);
    });
  });
}

// Listen for incoming calls
handlerequests(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('handlerequests', (message: any) => {
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
