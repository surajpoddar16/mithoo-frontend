import { Component, Input, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { StorageService } from '../service/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfig } from '../service/app.config';

@Component({
  selector: 'chat-pane',
  templateUrl: './chat_pane.component.html',
  styleUrls: ['./chat_pane.component.scss']
})
export class ChatPaneComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageBox') private messageBox: ElementRef;

  chatData: any[];
  contactData: any;

  messageSubscription: any;
  typingSubscription: any;

  typingTimeout: any;
  isTyping: boolean = false;

  private _activeChat: string;

  @Input() set activeChat(value: any) {
    this._activeChat = value;
    if (typeof value !== 'undefined' && value != null) {

      this.contactData = {
        avatar: value.friendAvatar || value.avatar,
        uuid: typeof value.friendId === 'undefined' ?  value.uuid : value.friendId
      };

      this.chatData = this.storageService.getChatFromId(typeof value.friendId === 'undefined' ?  value.uuid : value.friendId);
    }
  }
  get categoryId(): string {
    return this._activeChat;
  }

  message: string;

  constructor(
    private socketService: SocketService,
    private storageService: StorageService,
    private sanitizer: DomSanitizer,
    private appConfig: AppConfig) {
  }

  ngOnInit() {
    this.subscribeToMessage();
  }

  sendMessage() {
    this.socketService.sendMessage({
      recipient: this.contactData,
      message: this.message
    });
    this.message = undefined;
  }

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.appConfig.baseUrl + url);
  }

  subscribeToMessage() {
    var self = this;

    this.messageSubscription = this.socketService.getMessage()
      .subscribe(function(data: any) {
        if (self.contactData && data.sender.uuid == self.contactData.uuid) {
          self.onMessage(data);
        }
      });

    this.typingSubscription = this.socketService.getTypingStatus()
      .subscribe(function(data: any) {
        if (self.contactData && data.sender.uuid == self.contactData.uuid) {
          self.onTyping(data);
        }
      });
  }

  onMessage(data: any) {
    console.log(this.chatData);
    this.chatData.push(data);
    console.log(this.chatData);
    this.storageService.updateSeen(data.sender.uuid);
  }

  isSenderFriend(item: any) {
    return item.sender.uuid == this.contactData.uuid;
  }

  onTyping(data: any) {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.isTyping = true;

    var self = this;
    this.typingTimeout = setTimeout(function() {
      self.isTyping = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.typingSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    console.log(this.messageBox);
    this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
  }
}
