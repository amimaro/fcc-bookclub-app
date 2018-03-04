import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  constructor(public appService: AppService) {
    this.appService.getSession().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
        console.log(err);
        this.appService.routeTo(['/'])
      });
    this.appService.getAllBooks();
  }

  ngOnInit() {
  }

  renderRequestedClass(book) {
    return book.owner._id != book.tradeId ? "is-warning" : "is-success";
  }

  requestTrade(book) {
    this.appService.requestTrade(book);
  }

}
