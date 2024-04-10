import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { decodedTokenUrl,createTokenUrl } from '../constants/endpoint-usage';
import { ToastserviceService } from '../services/toastservice.service';

@Component({
  selector: 'app-decodetoken',
  templateUrl: './decodetoken.component.html',
  styleUrl: './decodetoken.component.scss'
})
export class DecodetokenComponent {
  token: String = ''
  decripted:any
  text:string = ""
  encripted:string = ""

  constructor(private http:HttpClient,private toastService:ToastserviceService){}


  async decode() {
    if (!this.token) {
      return
    }
    try {
      const payload = {token : this.token}
      const response:any = await this.http.post(decodedTokenUrl, payload).toPromise();
      if (response.status == 200) {
        this.decripted = response.data
      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }


  async encode() {
    if (!this.text) {
      return
    }
    try {
      const payload = {text : this.text}
      const response:any = await this.http.post(createTokenUrl, payload).toPromise();
      if (response.status == 200) {
        this.encripted = response.data
      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }

}
