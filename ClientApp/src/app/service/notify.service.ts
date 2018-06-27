import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Product } from '../model/product.model';

@Injectable()
export class NotifyService {
  private hubConnection: HubConnection;
  private mySubject: ReplaySubject<any>;
  public myEvent: Observable<any>;

  constructor(
    @Inject('BASE_URL') private baseUrl: string
  ) {
    console.log('NotifyService: ' + baseUrl);

    const url = baseUrl + 'hubs/chat';    
    this.hubConnection = new HubConnectionBuilder()
                          .withUrl(url)
                          .configureLogging(LogLevel.Information)
                          .build();

    this.mySubject = new ReplaySubject<any>();
    this.myEvent = this.mySubject.asObservable();
  }

  public startConnection(): Promise<void> {

    return this.hubConnection.stop().then(() =>

     this.hubConnection.start().then(() => {
      console.log('SignalR connected was established.');

      this.hubConnection.on('Connected',
        (args) => {
          console.log(args);
        });
      this.hubConnection.on('Disconnected',
        (args) => {
          console.log(args);
        });
      this.hubConnection.on('MyMethod', (args) => this.mySubject.next(args));
    })
    .catch(err => console.error(err.toString())
    ))
    .catch(err => console.error(err.toString()));
  }

  public MyMethod(data: Product) {
    this.hubConnection.invoke('MyMethod', [data]);
  }

}
