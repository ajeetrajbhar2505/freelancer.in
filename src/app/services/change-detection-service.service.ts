import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeDetectionServiceService {
  optdata: Subject<any> = new Subject<any>()
  nextRoute: Subject<any> = new Subject<any>()
  constructor() { }
}
