import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.route';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ChatListPanelComponent } from './chat-list-panel/chat_list_panel.component';
import { ChatListHeaderComponent } from './chat-list-panel/chat-list-header/chat_list_header.component';
import { ChatContactListComponent } from './chat-list-panel/chat-contact-list/chat_contact_list.component';
import { ChatPaneComponent } from './chat-pane/chat_pane.component';

import { UserService } from './service/user.service';
import { AppConfig } from './service/app.config';
import { ResponseService } from './service/response.service';
import { AvatarGuard } from './service/avatar.guard';
import { SocketService } from './service/socket.service';
import { StorageService } from './service/storage.service';
import { ChatFilterPipe } from './service/chat_filter.pipe';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AvatarComponent,
    MessengerComponent,
    ChatListPanelComponent,
    ChatListHeaderComponent,
    ChatContactListComponent,
    ChatPaneComponent,
    ChatFilterPipe
  ],
  providers: [
    UserService,
    AppConfig,
    ResponseService,
    AvatarGuard,
    SocketService,
    StorageService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
