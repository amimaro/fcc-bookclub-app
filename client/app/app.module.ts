import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AppService } from './services/app.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { TradesComponent } from './pages/trades/trades.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'allbooks',
    component: AllBooksComponent
  },
  {
    path: 'mybooks',
    component: MyBooksComponent
  },
  {
    path: 'mytrades',
    component: TradesComponent,
    data: {
      trade: 'My Trade Requests'
    }
  },
  {
    path: 'tradesforme',
    component: TradesComponent,
    data: {
      trade: 'Trade Requests for me'
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProfileComponent,
    AllBooksComponent,
    MyBooksComponent,
    TradesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // debugging purpose
    )
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
