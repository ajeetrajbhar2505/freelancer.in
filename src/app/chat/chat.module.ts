import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { RoomComponent } from './room/room.component';


@NgModule({
  declarations: [DashboardComponent, StatusComponent, RoomComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
