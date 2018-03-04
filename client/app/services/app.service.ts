import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  user: any;
  message: string = "";
  apiUrl: string = 'http://localhost:8080/api/'
  isLoggedIn: boolean = false;
  searchedBooks: any = [];
  availableBooks: any = [];
  myBooks: any = [];
  countMyTrades: any = 0;
  countTradesForMe: any = 0;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.getIsLoggedIn();
  }

  routeTo(route) {
    this.router.navigate(route);
  }

  getUser() { return this.user; }

  getSession() {
    return this.http.get(this.apiUrl + 'user/auth/session');
  }

  getIsLoggedIn() {
    this.getSession()
      .subscribe(
      res => {
        this.isLoggedIn = true;
        this.user = res;
        console.log(this.isLoggedIn)
      },
      err => {
        this.isLoggedIn = false;
        console.log(this.isLoggedIn)
      });
  }

  loginTwitter() {
    window.location.href = '/api/user/auth/twitter/login';
  }

  logout() {
    window.location.href = '/api/user/auth/logout';
  }

  updateProfile() {
    this.http.put('/api/user/' + this.user._id, this.user)
      .subscribe(
      res => {
        alert('Updated Successfully!')
        console.log(res);
      },
      err => {
        console.error(err);
      }
      )
  }

  searchBook(query) {
    if (query != "") {
      this.http.get(this.apiUrl + 'book/query/' + query)
        .subscribe(
        res => {
          console.log(res);
          this.searchedBooks = res;
        },
        err => {
          console.error(err);
        }
        )
    } else {
      alert('Enter some text');
    }
  }

  getAllBooks() {
    this.http.get(this.apiUrl + 'book/')
      .subscribe(
      res => {
        console.log(res);
        this.availableBooks = res;
        this.countMyTrades = 0;
        this.countTradesForMe = 0;
        this.availableBooks.map((book) => {
          // Count my trades
          if(this.user._id == book.tradeId && this.user._id != book.owner._id) {
            this.countMyTrades++;
          }
          //Count trades for me
          if(this.user._id != book.tradeId && this.user._id == book.owner._id) {
            this.countTradesForMe++;
          }
        })
      },
      err => {
        console.error(err);
      }
      )
  }

  getBooksByUser() {
    this.http.get(this.apiUrl + 'book/user')
      .subscribe(
      res => {
        console.log(res);
        this.myBooks = res;
      },
      err => {
        console.error(err);
      })
  }

  addBook(data) {
    let book = {
      title: data.volumeInfo.title,
      author: data.volumeInfo.authors[0],
      img: data.volumeInfo.imageLinks.smallThumbnail,
      bookId: data.id
    }
    this.http.post(this.apiUrl + 'book/', book)
      .subscribe(
      res => {
        alert('Book Added Successfully!');
        console.log(res);
        this.getBooksByUser();
      },
      err => {
        console.error(err);
      })
  }

  requestTrade(book) {
    if (book.tradeId == book.owner._id) {
      this.http.put(this.apiUrl + 'book/trade/' + book._id, book)
        .subscribe(
        res => {
          console.log(res);
          this.countMyTrades++;
          this.getAllBooks();
        },
        err => {
          console.error(err);
        })
    } else {
      alert('Sorry, it was already chosen...');
    }
  }

}
