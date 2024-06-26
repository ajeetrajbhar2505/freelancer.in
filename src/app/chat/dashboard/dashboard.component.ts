import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastserviceService } from '../../services/toastservice.service';
import { ApiService } from '../../services/api-service.service';
import { getUsersUrl, createRoomUrl, getRoomUsersUrl } from '../../constants/endpoint-usage';
import { WebsocketService } from '../../services/websocket.service';
import { CommondataserviceService } from '../../services/commondataservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class chatDashboardComponent implements OnInit {
  userDetails: any = {}
  activeClass = 'all-chat';
  submitted: boolean = false
  searchDialog: boolean = false
  activeIndex = 0
  tabs: any[] = [
    {
      title: 'All Chats',
      class: 'all-chat'
    },
    {
      title: 'Groups',
      class: 'group-chat'
    },
    {
      title: 'Contacts',
      class: 'contact-chat'
    },
  ]

  users = []
  roomUsers = []
  currentUser: String = ''

  constructor(
    private router: Router,
    private toastService: ToastserviceService,
    private apiService: ApiService,
    private websocketService: WebsocketService,
    private readonly CommondataserviceService: CommondataserviceService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }


  ngOnInit(): void {
    this.fetchapidetails()
    this.CommondataserviceService.reloaddata.subscribe(reload => {
      if (reload) {
        setTimeout(() => {
          window.location.reload()
        },);
      }
    })
  }

  fetchapidetails() {
    window.scrollTo(0, 0);
    this.getUsers()
    this.getroomUsers()
    this.handlerequests()
  }

  tooglesearchDialog() {
    this.searchDialog = !this.searchDialog
    if (!this.searchDialog) {
    this.CommondataserviceService.reloaddata.next(true)
    }
  }


  routeToStatus(userid: number) {
    this.router.navigate([`/chat/status/${userid}`])
  }

  routeToChat(roomId: any) {
    if (!roomId) {
      return
    }
    this.router.navigate([`/chat/room/${roomId}`])
  }

  get onlineUsers() {
    return this.users.filter(u => u.online)
  }

  get totalunreadMessages() {
    return 0
  }

  get totalonlineUsers() {
    return this.onlineUsers.length
  }

  activateTab(index: any) {
    this.activeIndex = index
    this.activeClass = this.tabs[index].class
  }

  logOut(): void {
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }


  async getroomUsers() {
    try {
      const response = await this.apiService.getData(getRoomUsersUrl).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.roomUsers = []
        this.roomUsers = response['data']
        this.currentUser = ""
        this.currentUser = response['currentUser']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }
  filterDateTime(dateString: string): string {
    if (!dateString) {
      return ""
    }
    const date = new Date(dateString);
    const options: any = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  }



  async getUsers() {
    try {
      const response = await this.apiService.getData(getUsersUrl).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.users = []
        this.users = response['data']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }


  async createRoom(receiverId: string) {
    this.submitted = true
    if (!receiverId) {
      return;
    }

    try {
      const payload = { receiverId: receiverId }
      const response = await this.apiService.postData(createRoomUrl, payload).toPromise();
      if (response.status == 200 || response.status == 201) {
        this.websocketService.sendRequest(payload, (acknowledgment) => {
          // Handle acknowledgment message from the server
          if (acknowledgment && acknowledgment.status === 200) {
            this.submitted = false
            this.toastService.success(response.message)
          }
        });
        this.getroomUsers()



      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }

  handlerequests() {
    this.websocketService.handlerequests().subscribe(response => {
      // fetching reponse
      window.location.reload()
    })
  }
}