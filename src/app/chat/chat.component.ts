import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  activeClass = 'all-chat';
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
   this.activeClass =  this.tabs[index].class
  }

}
