import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { createMessageUrl, getMessagesUrl, getRecieverDetailsUrl } from '../../constants/endpoint-usage';
import { ToastserviceService } from '../../services/toastservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

export interface message {
  roomId: string,
  sender: string,
  receiver: string,
  messageText: string,
  sentAt: string,
  lastSeen: string,
  lastMessage: string
}



@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit, OnDestroy {
  userDetails: any = {}
  recieverDetails: any
  messages: any[] = []
  message: string = ''
  callingStarted: boolean = false
  IncomingCall: boolean = false
  IncomingCallDetails:string = ""

  constructor(public apiService: ApiService, public toastService: ToastserviceService, private activatedRoute: ActivatedRoute, private websocketService: WebsocketService, private router: Router) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }

  ngOnInit(): void {
    this.getRecieverDetailsUrl()
    this.getMessages()
    this.onMessage()
    this.onIncomingCall()
    this.onDeclineCall()
    this.handleConnectionError()
  }


  onMessage() {
    this.websocketService.onMessage().subscribe(message => {
      this.messages.push(message)
    })
  }

  onIncomingCall() {
    this.websocketService.onIncomingCall().subscribe(IncomingCallDetails => {
      this.IncomingCallDetails = IncomingCallDetails
      this.IncomingCall = true
    })
  }

  onDeclineCall() {
    this.websocketService.onDeclineCall().subscribe(IncomingCallDetails => {
      this.IncomingCall = false
      this.callingStarted = false
        this.toastService.error('Call declined')
    })
  }


  handleConnectionError() {
    this.websocketService.handleConnectionError().subscribe(message => {
      this.toastService.error(message)
    })
  }

  async sendMessage() {
    if (!this.message) {
      this.toastService.error('Message can not be empty')
      return
    }
    try {
      const chat = {
        roomId: this.activatedRoute.snapshot.params['roomid'],
        sender: '',
        receiver: this.recieverDetails._id,
        messageText: this.message,
        sentAt: Date.now,
        lastSeen: '',
        lastMessage: '',
        token: localStorage.getItem('token')
      }

      // by socket call
      this.websocketService.sendMessage(chat, (acknowledgment) => {
        // Handle acknowledgment message from the server
        if (acknowledgment && acknowledgment.status === 200) {
          this.messages.push(chat)
          this.message = ''
        }
      });

      // by api call
      // const response = await this.apiService.postData(createMessageUrl, message).toPromise();
      // if (response.status == 200 || response.status == 201) {
      //   // fetch data 
      //   this.message = ''
      //   // receive message while send
      //   this.getMessages()
      // } else {
      //   this.toastService.error(response.message)
      // }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }

  async getRecieverDetailsUrl() {
    try {

      const payload = {
        roomId: this.activatedRoute.snapshot.params['roomid']
      }
      const response = await this.apiService.postData(getRecieverDetailsUrl, payload).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.recieverDetails = response['data']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }



  async getMessages() {
    try {

      const payload = {
        roomId: this.activatedRoute.snapshot.params['roomid']
      }
      const response = await this.apiService.postData(getMessagesUrl, payload).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.messages = response['messages']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }

  ngOnDestroy(): void {
  }

  routeToPage() {
    this.router.navigate(['chat/dashboard'])
  }

  startCall() {
    const callDetails = {
      roomId: this.activatedRoute.snapshot.params['roomid'],
      sender: '',
      receiver: this.recieverDetails._id,
      sentAt: Date.now,
      lastSeen: '',
      lastMessage: '',
      token: localStorage.getItem('token')
    }

    this.websocketService.startCall(callDetails, (acknowledgment) => {
      // Handle acknowledgment message from the server
      if (acknowledgment && acknowledgment.status === 200) {
        this.callingStarted = true
      }
    });
  }
  

  declineCall(){

    const callDetails = {
      roomId: this.activatedRoute.snapshot.params['roomid'],
      sender: '',
      receiver: this.recieverDetails._id,
      sentAt: Date.now,
      lastSeen: '',
      lastMessage: '',
      token: localStorage.getItem('token')
    }

    this.websocketService.declineCall(callDetails, (acknowledgment) => {
      // Handle acknowledgment message from the server
      if (acknowledgment && acknowledgment.status === 200) {
        this.IncomingCall = false
        this.callingStarted = false
      }
    });
  }

}