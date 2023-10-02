import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ItemsListComponent } from './items-list/items-list.component';
import {NgOptimizedImage} from "@angular/common";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserMenuComponent } from './header/user-menu/user-menu.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HeaderComponent, ItemsListComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, NgOptimizedImage, NoopAnimationsModule, UserMenuComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
