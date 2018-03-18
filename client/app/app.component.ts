import { Component } from '@angular/core';

import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isNavBar: boolean = false;

  constructor(public appService: AppService) { }

  toggleNavBar() {
    return this.isNavBar;
  }

}
