import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SocketService } from '../../service/socket.service';
import { StorageService } from '../../service/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfig } from '../../service/app.config';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'chat-contact-list',
  templateUrl: './chat_contact_list.component.html',
  styleUrls: ['./chat_contact_list.component.scss']
})
export class ChatContactListComponent implements OnInit, OnDestroy {
  chatList: any[] = [];
  messageSubscription: any;
  searchString: string;
  searchedFriends: any[] = [];

  searchTerms: Subject<string> = new Subject<string>();

  constructor(
    private userService: UserService,
    private socketService: SocketService,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private appConfig: AppConfig) {
  }

  ngOnInit() {
    this.chatList = this.storageService.getChatListFromLocalStorage();
    this.subscribeToMessage();

    this.subscribeFriendsSearch();
  }

  subscribeToMessage() {
    var self = this;

    this.messageSubscription = this.socketService.getMessage()
      .subscribe(function(data: any) {
        console.log('LIST', data);
        self.updateChatListFromIncoming(data);
      });
  }

  updateChatListFromIncoming(data: any) {
    this.chatList.push({
      friendId: data.sender.uuid,
      friendAvatar: data.sender.avatar,
      message: data.message,
      date: data.date,
      seen: data.seen
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.appConfig.baseUrl + url);
  }

  search(): void {
    this.searchTerms.next(this.searchString);
  }

  subscribeFriendsSearch() {
    var self = this;
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(function(term) {
        return term
          ? self.userService.getFriendsList(term)
          : Observable.of<any[]>([])
      }).subscribe(function(result) {
          self.searchedFriends = result;
      });
  }
}
