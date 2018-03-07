import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  user: any;
  message: string = "";
  apiUrl: string = 'http://localhost:8080/api/'
  isLoggedIn: boolean = false;
  myBooks: any = [];
  searchedBooks: any = [];
  availableBooks: any = [];
  booksMyTrades: any = [];
  booksTradesForMe: any = [];

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
          this.searchedBooks = res['items'].filter((book) => {
            if (book.volumeInfo.title == undefined ||
              book.volumeInfo.authors == undefined ||
              book.volumeInfo.imageLinks.smallThumbnail == undefined ||
              book.id == undefined) {
              return false;
            }
            // console.log(book)
            return true;
          });
          if (this.searchedBooks.length > 5)
            this.searchedBooks = this.searchedBooks.slice(0, 5);
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
        this.booksMyTrades = [];
        this.booksTradesForMe = [];
        this.availableBooks.map((book) => {
          // Count my trades
          if (this.user._id == book.tradeId && this.user._id != book.owner._id) {
            this.countMyTrades++;
            this.booksMyTrades.push(book);
          }
          //Count trades for me
          if (this.user._id != book.tradeId && this.user._id == book.owner._id) {
            this.countTradesForMe++;
            this.booksTradesForMe.push(book);
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

  addBook(data, index) {
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
        this.searchedBooks.splice(index, 1);
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

  confirmRequest(index) {
    this.http.put(this.apiUrl + 'book/trade/confirm/' +
      this.booksTradesForMe[index]['_id'], this.booksTradesForMe[index])
      .subscribe(
      res => {
        console.log(res);
        this.getAllBooks();
      },
      err => {
        console.error(err);
      })
  }

  cancelRequest(index) {
    this.http.put(this.apiUrl + 'book/trade/cancel/' +
      this.booksMyTrades[index]['_id'], this.booksMyTrades[index])
      .subscribe(
      res => {
        console.log(res);
        this.getAllBooks();
      },
      err => {
        console.error(err);
      })
  }

  refuseRequest(index) {
    this.http.put(this.apiUrl + 'book/trade/cancel/' +
      this.booksTradesForMe[index]['_id'], this.booksTradesForMe[index])
      .subscribe(
      res => {
        console.log(res);
        this.getAllBooks();
      },
      err => {
        console.error(err);
      })
  }

}
