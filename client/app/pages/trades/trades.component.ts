import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  title: string = "";

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .data
      .subscribe(data => {
        this.title = data.trade;
      });
  }

}
