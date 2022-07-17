import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ChatService } from '../chat.service';
import { WebsocketService } from "./../websocket.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
  providers: [WebsocketService, ChatService]
})
export class AdminComponent {
  number = "0";

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      if (msg != null) {
        this.number = msg.number;
      }

    });
  }

  add() {
    this.number = (Number(this.number) + 1).toString();
    this.emit();
  }

  remove() {
    if (Number(this.number) > 0) {
      this.number = (Number(this.number) - 1).toString();
      this.emit();
    }
  }

  replace() {
    this.emit();
  }

  emit() {
    this.chatService.messages.next({
      lastCall: moment().format("DD/MM/YYYY HH:mm:ss"),
      number: this.number.toString()
    });
  }
}
