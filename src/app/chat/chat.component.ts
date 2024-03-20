import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
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

  activateTab(index: any) {
    this.activeIndex = index
   this.activeClass =  this.tabs[index].class
  }
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
