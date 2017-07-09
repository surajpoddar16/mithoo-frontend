import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'chat-list-header',
  templateUrl: './chat_list_header.component.html',
  styleUrls: ['./chat_list_header.component.scss']
})
export class ChatListHeaderComponent implements OnInit, OnDestroy {
  avatar: any;
  connectionStatus: any = "Offline";
  connection: any;
  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private socketService: SocketService) {}

  ngOnInit() {
    this.getAvatar();
    this.subscribeToConnection();
  }

  getAvatar() {
    var self = this;
    this.avatar = this.userService.getAvatarFromLocalStorage();
  }

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  subscribeToConnection() {
    var self = this;

    this.connection = this.socketService.getConnectionStatus()
      .subscribe(function(status) {
        self.connectionStatus = status;
      });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
