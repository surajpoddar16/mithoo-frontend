import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AvatarGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate() {
    if (this.userService.getAvatarFromLocalStorage().name) {
      return true;
    }

    this.router.navigate(['/get-avatar']);
  }
}
