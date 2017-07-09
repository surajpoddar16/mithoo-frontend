import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chat-list-panel',
  templateUrl: './chat_list_panel.component.html',
  styleUrls: ['./chat_list_panel.component.scss']
})
export class ChatListPanelComponent {
  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  onSelect(friend: any) {
    this.select.emit(friend);
  }
}
