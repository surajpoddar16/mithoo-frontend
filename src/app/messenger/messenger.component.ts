import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../service/socket.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {
  messageSubscription: any;

  constructor(
    private socketService: SocketService,
    private storageService: StorageService) {
  }

  ngOnInit() {
    this.socketService.connect();
    this.subscribeToMessage();

    if (this.storageService.isChatHistoryEmpty()) {
      this.welcomePing();
    }
  }

  welcomePing() {
    this.socketService.sendWelcomePing();
  }

  subscribeToMessage() {
    var self = this;

    this.messageSubscription = this.socketService.getMessage()
      .subscribe(function(data) {
        console.log('MESSENGER', data);
        self.storageService.saveIncomingChatData(data);
      });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
