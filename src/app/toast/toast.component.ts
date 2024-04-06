// toast.component.ts
import { Component, Input, OnInit, input } from '@angular/core';
import { ToastserviceService } from '../services/toastservice.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string = '';
  show: boolean = false;
  timer: number = 0;

  constructor(
    private toastService: ToastserviceService
  ) { }

  ngOnInit() {
    this.toastService.toastSubject.subscribe(message => {
      if (message) {
        this.show = true;
        this.timer = 2000;
        setTimeout(() => {
          this.close();
        }, this.timer);
      } else {
        this.show = false;
        this.timer = 0;
      }
      this.message = message;
    });
  }


  close() {
    this.show = false;
  }

}
