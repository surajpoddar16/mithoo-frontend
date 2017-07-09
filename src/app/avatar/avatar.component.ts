import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'avatar-page',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getAvatar();
  }

  getAvatar() {
    var self = this;
    this.userService.getAvatar().then(function(avatar) {
      self.userService.storeAvatar(avatar);
      self.router.navigate(['/']);
    }, function(err) {
      console.log(err);
    });
  }
}
