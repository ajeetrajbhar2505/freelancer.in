import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { chatDashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path : '',redirectTo  : 'dashboard',pathMatch : 'full' },
  {path : 'dashboard',component : chatDashboardComponent},
  {path : 'status/:userid',component : StatusComponent},
  {path : 'room/:roomid',component : RoomComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
