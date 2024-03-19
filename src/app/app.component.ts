import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'freelancer.in';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
