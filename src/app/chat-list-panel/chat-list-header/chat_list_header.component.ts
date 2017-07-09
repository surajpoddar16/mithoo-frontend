import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'chat-list-header',
  templateUrl: './chat_list_header.component.html',
  styleUrls: ['./chat_list_header.component.scss']
})
export class ChatListHeaderComponent {
  avatar: any;
  connectionStatus: any = "Online";
  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getAvatar();
  }

  getAvatar() {
    var self = this;
    this.avatar = this.userService.getAvatarFromLocalStorage();
  }

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
