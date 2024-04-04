import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
  ,
  {
    path : 'auth',
    loadChildren : () => import('./login/login.module').then(m => m.LoginModule)
  }
  ,
  {
    path : 'chat',
    loadChildren : () => import('./chat/chat.module').then(m => m.ChatModule),
    canActivate : [LoginGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
