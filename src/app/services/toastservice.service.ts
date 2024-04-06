import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService {
   toastSubject: Subject<any> = new Subject<any>()

   show(message:string){
     this.toastSubject.next(message);
   }

   hide(){
    this.toastSubject.next('');
   }
  constructor() { }
}
