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

  getBooks() {
    this.http.get(this.apiUrl + 'book/')
      .subscribe(
      res => {
        console.log(res);
        this.availableBooks = res;
      },
      err => {
        console.error(err);
      }
      )
  }

  getBooksByUser() {
    this.http.get(this.apiUrl + 'book/user/' + this.user._id)
      .subscribe(
      res => {
        console.log(res);
        this.availableBooks = res;
      },
      err => {
        console.error(err);
      }
      )
  }

}
