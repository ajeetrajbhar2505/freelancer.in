import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { createMessageUrl,getMessagesUrl,getRecieverDetailsUrl } from '../../constants/endpoint-usage';
import { ToastserviceService } from '../../services/toastservice.service';
import { ActivatedRoute } from '@angular/router';


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
export class RoomComponent implements OnInit {
  userDetails: any = {}
  recieverDetails: any 
  messages: message[] = []
  message: string = ''

  constructor(public apiService: ApiService, public toastService: ToastserviceService, private activatedRoute: ActivatedRoute) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }

  ngOnInit(): void {
    this.getRecieverDetailsUrl()
    this.getMessages()
  }


  async sendMessage() {
    if (!this.message) {
      this.toastService.error('Message can not be empty')
      return
    }
    try {

      const message = {
        roomId: this.activatedRoute.snapshot.params['roomid'],
        sender : '',
        receiver: this.recieverDetails._id,
        messageText: this.message,
        sentAt: Date.now,
        lastSeen: '',
        lastMessage: ''
      }

      const response = await this.apiService.postData(createMessageUrl, message).toPromise();
      if (response.status == 200 || response.status == 201) {
        // fetch data 
        this.message = ''
        // receive message while send
        this.getMessages()
      } else {
        this.toastService.error(response.message)
      }
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
}