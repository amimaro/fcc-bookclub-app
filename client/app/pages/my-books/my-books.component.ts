import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  bookSearch: string = "";

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
      this.appService.getBooksByUser();
  }

  ngOnInit() {
  }

  searchBook() {
    this.appService.searchBook(this.bookSearch);
  }

  addBook(book, index) {
    this.appService.addBook(book, index);
  }

}
