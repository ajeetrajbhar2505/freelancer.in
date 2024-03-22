import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  { path : '**',redirectTo  : 'dashboard',pathMatch : 'full' },
  {path : 'dashboard',component : DashboardComponent},
  {path : 'status',component : StatusComponent},
  {path : 'room',component : RoomComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
