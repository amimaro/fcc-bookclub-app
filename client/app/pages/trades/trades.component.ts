import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  title: string = "";
  mode: string = "";

  constructor(public appService: AppService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.appService.getSession().subscribe(
      res => {
        console.log(res);
        this.mode = this.router.url.substring(1);
        // Get Data from Routing Module
        this.route.data
          .subscribe(data => {
            this.title = data.trade;
          });
      },
      err => {
        console.log("Error occured");
        console.log(err);
        this.appService.routeTo(['/']);
      });
  }

  confirmTrade(index) {
    this.appService.confirmRequest(index);
  }

  removeTrade(index) {
    if(this.mode == 'mytrades'){
      this.appService.cancelRequest(index);
    } else {
      this.appService.refuseRequest(index);
    }
  }

}
