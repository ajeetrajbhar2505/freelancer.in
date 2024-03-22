import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  activeClass = 'all-chat';
  activeIndex = 0
  tabs: any[] = [
    {
      title: 'All Chats',
      class  : 'all-chat'
    },
    {
      title: 'Groups',
      class  : 'group-chat'
    },
    {
      title: 'Contacts',
      class  : 'contact-chat'
    },
  ]

  onlineUsers = [
    { 
      img : 'https://assets.materialup.com/uploads/0a167b5f-425d-4b90-adeb-57016ccbcbcd/0x0ss-85.jpg'
    },
    {
      img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png'
    },
    {
      img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png'
    },
    {
      img : 'https://freebiehive.com/wp-content/uploads/2021/08/Facebook-Icon-PNG-1.jpg'
    }
  ]

  activateTab(index: any) {
    this.activeIndex = index
   this.activeClass =  this.tabs[index].class
  }
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
