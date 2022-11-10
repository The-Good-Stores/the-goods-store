import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, ItemListComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, UserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
