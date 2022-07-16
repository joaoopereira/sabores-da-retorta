import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "ws://ws.retorta.com:8081";

export interface Message {
  date: string;
  number: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
      map(
        (response: MessageEvent): Message => {
          if (response.data != "") {
            let data = JSON.parse(response.data);
            return {
              date: data.date,
              number: data.number
            };
          }
          else {
            return {
              date: "",
              number: "0"
            };
          }

        }
      )
    );
  }
}