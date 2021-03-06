import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(public appService: AppService) {
    this.appService.getSession().subscribe(
      res => {
        console.log(res);
        this.user = res;
      },
      err => {
        console.log("Error occured");
        console.log(err);
        this.appService.routeTo(['/'])
      });
  }

  ngOnInit() {
  }

  updateProfile() {
    this.appService.updateProfile();
  }

}
