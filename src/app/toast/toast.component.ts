// toast.component.ts
import { Component, Input, OnInit, input } from '@angular/core';
import { ToastserviceService } from '../services/toastservice.service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  message: string = '';
  show: boolean = false;
  timer: number = 0;
  type: string
  private timeout: any;
  constructor(
    private toastService: ToastserviceService
  ) { }

  ngOnInit() {
    this.toastService.showSubject.subscribe(data => {
      clearTimeout(this.timeout);

      this.show = true;
      this.message = data.message;
      this.type = data.type;

      this.timer = 2000;
      this.timeout = setTimeout(() => {
        this.close();
      }, this.timer);
    });

    this.toastService.hideSubject.subscribe(show => {
      this.show = show;
      this.timer = 0;
    });
  }


  close() {
    this.show = false;
  }

}
