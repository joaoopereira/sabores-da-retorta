import { Component, OnInit, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.less'],
  providers: [ChatService]
})
export class NumberComponent {
  @ViewChild(AdminComponent) admin: any;
  number = "0";
  lastCall = "";


  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg.number);
      this.number = msg.number;
      this.lastCall = msg.date;
    });
  }
}
