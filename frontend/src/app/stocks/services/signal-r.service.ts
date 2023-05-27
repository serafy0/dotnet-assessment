import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IStock } from '../types/IStock';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  //   public data: IStock[];
  //   private hubConnection: signalR.HubConnection;
  //   public startConnection = () => {
  //     this.hubConnection = new signalR.HubConnectionBuilder()
  //       .withUrl('https://localhost:7288/stockHub')
  //       .build();
  //     this.hubConnection
  //       .start()
  //       .then(() => console.log('Connection started'))
  //       .catch((err) => console.log('Error while starting connection: ' + err));
  //   };

  //   public addTransferStockDataListener = () => {
  //     this.hubConnection.on('PriceUpdates', (data) => {
  //       this.data = data;
  //       console.log(data);
  //     });
  //     return this.data;
  //   };
  public signalRObservable(url: string, method: string): Observable<any> {
    // Establishes a Hub Connection with specified url.
    const conn: signalR.HubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .build();

    const subject: Subject<any> = new Subject<any>();

    // On reciving an event when the hub method with the specified method name is invoked
    conn.on(method, (...args: any[]) => {
      // Multicast the event.
      subject.next(args);
    });

    // When the connection is closed.
    conn.onclose((err?: Error) => {
      if (err) {
        // An error occurs
        subject.error(err);
      } else {
        // No more events to be sent.
        subject.complete();
      }
    });

    // Starts the connection.
    conn.start();

    // To be subscribed to by multiple components
    return subject;
  }
}
