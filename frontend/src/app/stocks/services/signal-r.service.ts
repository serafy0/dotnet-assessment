import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IStock } from '../types/IStock';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  public signalRObservable(url: string, method: string): Observable<any> {
    const conn: signalR.HubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();

    const subject: Subject<any> = new Subject<any>();

    conn.on(method, (...args: any[]) => {
      // Multicast the event.
      subject.next(args);
    });

    conn.onclose((err?: Error) => {
      if (err) {
        subject.error(err);
      } else {
        subject.complete();
      }
    });

    // Starts the connection.
    conn.start();

    // To be subscribed to by multiple components
    return subject;
  }
}
