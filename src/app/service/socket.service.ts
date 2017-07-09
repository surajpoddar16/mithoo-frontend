import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {
  socket: any;

  constructor(private appConfig: AppConfig) {
  }

  connect() {
    this.socket = io(this.appConfig.socketUrl);
  }

  getConnectionStatus() {
    var self = this;
    var observable = new Observable(function(observer: any) {
      self.connect();

      self.socket.on('connect', function() {
        observer.next('Online');
      });

      self.socket.on('disconnect', function() {
        observer.next('Offline');
      });

      return function() {
      }
    });

    return observable;
  }
}
