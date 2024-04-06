import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastserviceService {
  private toastSubject = new Subject<string>();

  show(message: string) {
    this.toastSubject.next(message);
  }

  hide() {
    this.toastSubject.next('');
  }

  onToast() {
    return this.toastSubject.asObservable();
  }
  
  constructor() { }
}
