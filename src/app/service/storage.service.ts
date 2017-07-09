import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';

@Injectable()
export class StorageService {
  chatHistory: any = {};
  constructor(private appConfig: AppConfig) {
    this.chatHistory = JSON.parse(localStorage.getItem('chat_history')) || {};
  }

  getChatHistory() {
    return this.chatHistory;
  }

  isChatHistoryEmpty() {
    return Object.keys(this.chatHistory).length === 0;
  }

  saveIncomingChatData(chatData: any) {
    if (this.chatHistory[chatData.sender.uuid]) {
      this.chatHistory[chatData.sender.uuid].messages.push(chatData);
    } else {
      this.chatHistory[chatData.sender.uuid] = {
        friendAvatar: chatData.sender.avatar
      };
      this.chatHistory[chatData.sender.uuid].messages = [chatData];
    }

    localStorage.setItem('chat_history', JSON.stringify(this.chatHistory));
  }

  saveOutgoingChatData(chatData: any) {
    if (this.chatHistory[chatData.recipient.uuid]) {
      this.chatHistory[chatData.recipient.uuid].messages.push(chatData);
    } else {
      this.chatHistory[chatData.recipient.uuid] = {
        friendAvatar: chatData.recipient.avatar
      };
      this.chatHistory[chatData.recipient.uuid].messages = [chatData];
    }

    localStorage.setItem('chat_history', JSON.stringify(this.chatHistory));
  }

  findInHistory(query: string) {
    return this.chatHistory.filter(function(item: any) {
      item.friendName.includes(query);
    });
  }

  getChatListFromLocalStorage(): any[] {
    var chatList = [];

    for (var key in this.chatHistory) {
      if (this.chatHistory.hasOwnProperty(key)) {
        var chatItem = this.chatHistory[key].messages[this.chatHistory[key].messages.length - 1];

        chatList.push({
          friendId: key,
          friendAvatar: this.chatHistory[key].friendAvatar,
          message: chatItem.message,
          date: chatItem.date,
          seen: chatItem.seen
        });
      }
    }

    return chatList;
  }
}
