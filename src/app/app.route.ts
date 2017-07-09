import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from './avatar/avatar.component';

import { AvatarGuard } from './service/avatar.guard';
import { MessengerComponent } from './messenger/messenger.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [AvatarGuard],
        component: MessengerComponent
      },
      {
        path: 'get-avatar',
        component: AvatarComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
