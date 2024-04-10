import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService {
   showSubject: Subject<any> = new Subject<any>()
   hideSubject: Subject<any> = new Subject<any>()


   success(message:string){
    const data  = { message: message,type: 'success'}
     this.showSubject.next(data);
   }

   alert(message:string){
    const data  = { message: message,type: 'alert'}
     this.showSubject.next(data);
   }

   error(message:string){
    const data  = { message: message,type: 'error'}
     this.showSubject.next(data);
   }

   info(message:string){
    const data  = { message: message,type: 'info'}
     this.showSubject.next(data);
   }

   hide(){
    this.hideSubject.next(true);
   }
  constructor() { }
}
