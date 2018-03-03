import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  user: any;
  message: string = "";
  apiUrl: string = 'http://localhost:8080/api/'
  isLoggedIn: boolean = false;

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

}
