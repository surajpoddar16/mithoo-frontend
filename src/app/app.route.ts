import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
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
