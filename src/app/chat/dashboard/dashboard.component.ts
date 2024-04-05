import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class chatDashboardComponent implements OnInit {
  userDetails = { name : 'Ajeet'}
  activeClass = 'all-chat';
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

  users = [
    {
      profile: 'https://img1.wsimg.com/isteam/ip/8f9a5028-92cb-4074-8d56-1467f1e7cf32/ajeetrajbhar.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2000,h:2000,cg:true',
      online: false,
      verified : false,
      userid: 0,
      username : 'Ajeet Rajbhar (You)',
      roomId: 99,
      lastSeen : '12.34',
      lastMessage : `Ok, Let me check`
    },
    {
      profile: 'https://assets.materialup.com/uploads/0a167b5f-425d-4b90-adeb-57016ccbcbcd/0x0ss-85.jpg',
      online: true,
      verified : true,
      userid: 1,
      username : 'Whatsapp',
      roomId: 100,
      lastSeen : 'Yesterday',
      lastMessage : `Let's have meeting with you`
    },
    {
      profile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png',
      online: true,
      verified : true,
      userid: 2,
      username : 'Telegram',
      roomId: 101,
      lastSeen : 'Yesterday',
      lastMessage : `Let's have meeting with you`
    },
    {
      profile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
      online: true,
      verified : true,
      userid: 3,
      username : 'Facebook',
      roomId: 102,
      lastSeen : 'Yesterday',
      lastMessage : `Let's have meeting with you`
    },
    {
      profile: 'https://freebiehive.com/wp-content/uploads/2021/08/Facebook-Icon-PNG-1.jpg',
      online: true,
      verified : true,
      userid: 4,
      username : 'Snapchat',
      roomId: 103,
      lastSeen : 'Yesterday',
      lastMessage : `Let's have meeting with you`
    }
  ]

  constructor(
    private router:Router
  )
  {}

  get onlineUsers() {
    return this.users.filter(u => u.online)
  }

  get totalunreadMessages() {
    return this.users.length
  }

  get totalonlineUsers() {
    return this.onlineUsers.length
  }

  activateTab(index: any) {
    this.activeIndex = index
    this.activeClass = this.tabs[index].class
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }


  logOut(): void {
     localStorage.clear()
    this.router.navigate(['/auth/login'])
  }

}
