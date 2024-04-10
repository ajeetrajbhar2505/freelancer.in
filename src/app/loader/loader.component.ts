import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  showLoading:boolean = false;


  constructor(
    private readonly LoaderService: LoaderService
  ) { }
  ngOnInit(): void {
    this.LoaderService.showLoaderSubject.subscribe(data => {
      this.showLoading = data
    })
  }
}