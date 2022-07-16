import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../chat.service';
import { WebsocketService } from "./../websocket.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
  providers: [WebsocketService, ChatService]
})
export class AdminComponent implements OnInit {

  @Output() msgToNumberPage = new EventEmitter<any>();

  number = 0;

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg.number);
      this.number = Number(msg.number);
    });
  }

  private message = {
    date: "",
    number: ""
  };

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.chatService.messages.next(this.message);
  }

  ngOnInit(): void {
  }

  add() {
    this.number++;
    this.emit();
  }

  remove() {
    if (this.number > 0) {
      this.number--;
      this.emit();
    }
  }

  replace() {
    this.emit();
  }

  emit() {
    this.message.date = this.formatDate(new Date());
    this.message.number = this.number.toString();
    this.chatService.messages.next(this.message);
  }

  padTo2Digits(num: { toString: () => string; }) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: { getMonth: () => number; getDate: () => any; getFullYear: () => any; getHours: () => any; getMinutes: () => any; getSeconds: () => any; }) {
    return (
      [
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join('/') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

}
