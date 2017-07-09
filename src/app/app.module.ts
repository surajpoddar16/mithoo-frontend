import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.route';

import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MessengerComponent } from './messenger/messenger.component';

import { UserService } from './service/user.service';
import { AppConfig } from './service/app.config';
import { ResponseService } from './service/response.service';
import { AvatarGuard } from './service/avatar.guard';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    AvatarComponent,
    MessengerComponent
  ],
  providers: [
    UserService,
    AppConfig,
    ResponseService,
    AvatarGuard
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
