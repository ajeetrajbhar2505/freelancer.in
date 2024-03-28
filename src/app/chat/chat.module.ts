import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { RoomComponent } from './room/room.component';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, StatusComponent, RoomComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
