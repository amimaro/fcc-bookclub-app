import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  title: string = "";

  constructor(public appService: AppService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.appService.getSession().subscribe(
      res => {
        console.log(res);
        // Get Data from Routing Module
        this.route.data
          .subscribe(data => {
            this.title = data.trade;
          });
      },
      err => {
        console.log("Error occured");
        console.log(err);
        this.appService.routeTo(['/'])
      });
  }

}
