import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
   showLoaderSubject: Subject<any> = new Subject<any>()

   showLoader() {
    this.showLoaderSubject.next(true);
  }

  hideLoader() {
    this.showLoaderSubject.next(false);
  }
   
   constructor() { }
}
