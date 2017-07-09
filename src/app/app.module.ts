import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.route';

import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ChatListPanelComponent } from './chat-list-panel/chat_list_panel.component';
import { ChatListHeaderComponent } from './chat-list-panel/chat-list-header/chat_list_header.component';
import { ChatContactListComponent } from './chat-list-panel/chat-contact-list/chat_contact_list.component';

import { UserService } from './service/user.service';
import { AppConfig } from './service/app.config';
import { ResponseService } from './service/response.service';
import { AvatarGuard } from './service/avatar.guard';
import { SocketService } from './service/socket.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    AvatarComponent,
    MessengerComponent,
    ChatListPanelComponent,
    ChatListHeaderComponent,
    ChatContactListComponent
  ],
  providers: [
    UserService,
    AppConfig,
    ResponseService,
    AvatarGuard,
    SocketService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
