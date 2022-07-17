import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { WebsocketService } from "./websocket.service";

import { environment } from './../environments/environment';
import * as moment from "moment";

const URL = environment.webSocketServerUrl;

export interface Message {
  lastCall: string;
  number: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect(URL).pipe(
      map(
        (response: MessageEvent): any => {
          console.debug(`${moment().format("DD/MM/YYYY HH:mm:ss")} | ${response.data}`);
          if (response.data != "" && response.data != "pong") {
            let data = JSON.parse(response.data);
            return {
              lastCall: data.lastCall,
              number: data.number
            };
          } else if (response.data != "" && response.data == "pong") {
            return null;
          }
          else {
            return {
              lastCall: "",
              number: "0"
            };
          }

        }
      )
    );
  }
}