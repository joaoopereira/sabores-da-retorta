import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable, Subject, Observer } from "rxjs";
import { setWsHeartbeat } from "ws-heartbeat/client";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() { }

  private subject: Subject<MessageEvent> | undefined;
  private ws: any;
  private retryAttempt = 1;

  public connect(url: string | URL): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string | URL): Subject<MessageEvent> {
    this.ws = new WebSocket(url);
    console.log(`${moment().format("DD/MM/YYYY HH:mm:ss")} | Successfully connected: ${url}`);

    // Heartbeat
    setInterval(async () => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send("ping");
      }
      else {
        console.log(`${moment().format("DD/MM/YYYY HH:mm:ss")} | WebSocket connection failed. Retrying in 3 seconds... Retry attempt: ${this.retryAttempt}`)
        this.retryAttempt++;
        setTimeout(() => {
          this.ws = new WebSocket(url);
        }, 3000);
      }
    }, 5000);

    let observable = new Observable((obs: Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    });
    let observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }

  public isConnected(): boolean {
    return (this.ws.readyState === WebSocket.OPEN);
  }
}