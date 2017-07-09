import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from './avatar/avatar.component';

import { AvatarGuard } from './service/avatar.guard';
import { MessengerComponent } from './messenger/messenger.component';
import { ChatPaneComponent } from './chat-pane/chat_pane.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [AvatarGuard],
        component: MessengerComponent,
        children: [
          {
            path: 'chat',
            component: ChatPaneComponent
          }
        ]
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
