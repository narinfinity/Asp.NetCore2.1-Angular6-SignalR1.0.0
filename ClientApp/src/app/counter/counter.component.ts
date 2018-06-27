import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { NotifyService } from '../service/notify.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {

  public currentCount = 0;
  constructor(private notifyService: NotifyService) {

  }

  ngOnInit(): void {
     this.notifyService.startConnection()
     .then((a) => {
      this.notifyService.myEvent
        .subscribe(
          (val) => {
            console.log(JSON.stringify(val));
          },
          (error) => {
            console.log(error);
          },
          () => {
            console.log('comleted');
          });
      });
  }
  public incrementCounter() {
    this.currentCount++;
    const product = new Product();
    product.id = this.currentCount;
    product.name = this.currentCount.toString();
    product.description = this.currentCount.toString();
    this.notifyService.MyMethod(product);
  }

}
