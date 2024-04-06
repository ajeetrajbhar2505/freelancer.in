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

  constructor(
    private toastService: ToastserviceService
  ) { }

  ngOnInit(): void {
    this.toastService.onToast().subscribe(message => {
      this.message = message;
      this.show = message ? true : false;
      console.log(this.show);
      console.log(message);
    });
  }

  close() {
    this.show = false;
  }

}
