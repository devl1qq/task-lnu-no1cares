import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { NgOptimizedImage } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserMenuComponent } from './header/user-menu/user-menu.component';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './common/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ItemsListComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NoopAnimationsModule,
    UserMenuComponent,

    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
