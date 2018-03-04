import { Component, OnInit } from '@angular/core';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  bookSearch: string = "";

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

  searchBook() {
    this.appService.searchBook(this.bookSearch);
  }

  addBook(book) {
    this.appService.addBook(book);
  }

}
