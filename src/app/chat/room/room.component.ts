import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api-service.service';
import { environment } from '../../../environments/environment';
import { getRecieverDetailsUrl } from '../../constants/endpoint-usage';
import { ToastserviceService } from '../../services/toastservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  private stopRecording$ = new Subject<void>();
  userDetails: any = {}
  searchGroup!: FormGroup
  loading = false
  recordingStarted = false
  recognition: any
  recieverDetails: any = {}
  @ViewChild('content') private content: any;

  constructor(public apiService: ApiService, public formbuilder: FormBuilder, public toastService: ToastserviceService, private activatedRoute: ActivatedRoute) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }

  ngOnInit() {
    this.createFormgroup()
    this.recognition = (window as any).recognition;
    this.getRecieverDetailsUrl()
  }

  async getRecieverDetailsUrl() {
    try {

      const payload = {
        roomId: this.activatedRoute.snapshot.params['roomid']
      }
      const response = await this.apiService.postData(getRecieverDetailsUrl, payload).toPromise();
      if (response.status == 200) {
        // fetch data 
        this.recieverDetails = response['data']

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }

  }

  createFormgroup() {
    this.searchGroup = this.formbuilder.group({
      array: new FormArray([this.anothergroup()])
    })
  }

  anothergroup(): FormGroup {
    return this.formbuilder.group({
      question: new FormControl(''),
      answer: new FormControl(''),
      searched: false,
      minutes: 0,
      seconds: 0
    })
  }


  searchArrayControl() {
    return (this.searchGroup.get('array') as FormArray).controls
  }


  push() {
    let array = this.searchGroup.get('array') as FormArray
    array.push(this.anothergroup())
  }


  async getResponse(index: any) {
    const array = this.searchGroup.get('array') as FormArray;
    const question = array.at(index).get('question')?.value.trim();

    if (!question) {
      return;
    }

    array.at(index).get('searched')?.patchValue(true)
    this.scrollToBottomOnInit();
    this.push()
    this.loading = true

    let body = {
      prompt: question
    }

    let response: any = await this.apiService.postData(environment.apiURL + 'geminiSearch', body).toPromise()
    if (response.status == 200) {
      this.loading = false
      this.scrollToBottomOnInit();
      array.at(index).get('answer')?.patchValue(response.response)

    } else {
      this.loading = false
      this.scrollToBottomOnInit();
      array.at(index).get('answer')?.patchValue('Not Found')
    }
  }


  scrollToBottomOnInit() {
    this.content.scrollToBottom(300);
  }

  scrollToTopOnInit() {
    this.content.scrollToTop(300);
  }


  startFunction(index: any) {
    const array: any = this.searchGroup.get('array') as FormArray;
    if (!this.recognition || this.recognition && this.recognition.grammars.length === 0) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
    }
    if (!this.recordingStarted) {
      try {
        this.recordingStarted = true;
        let secondsElapsed = 0;
        array.at(index).get('minutes')?.setValue(0);
        array.at(index).get('seconds')?.setValue(0);
        let timerInterval = setInterval(() => {
          secondsElapsed++;
          array.at(index).get('minutes')?.patchValue(Math.floor(secondsElapsed / 60));
          array.at(index).get('seconds')?.patchValue(secondsElapsed % 60);
          if (!this.recordingStarted) {
            clearInterval(timerInterval);
          }
        }, 1000);

        this.recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          array.at(index).get('question')?.patchValue(result);
          this.getResponse(index);
          this.recordingStarted = false;
        };
        this.recognition.start();
      } catch (e) {
        console.log(e);
      }
    }
  }


  stopFunction(index: any) {
    const array: any = this.searchGroup.get('array') as FormArray;
    if (this.recognition && this.recordingStarted) {
      try {
        this.recognition.stop();
        this.recordingStarted = false;
        this.recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          array.at(index).get('question')?.patchValue(result);
          this.getResponse(index);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }



}
