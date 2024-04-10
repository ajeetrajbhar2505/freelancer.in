import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Function for making a GET request
  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  // Function for making a POST request
  postData(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  // Function for uploading files using FormData
  uploadFile(url: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url, formData);
  }
}
