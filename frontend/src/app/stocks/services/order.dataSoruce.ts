import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from './order.service';
import { IOrder } from '../types/IOrder';

@Injectable()
export class OrderDataSource extends DataSource<IOrder> {
  orders$ = new BehaviorSubject<IOrder[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private orderservice: OrderService) {
    super();
  }

  connect(): Observable<IOrder[]> {
    return this.orders$.asObservable();
  }
  disconnect(): void {
    this.orders$.complete();
  }
  loadorders(): void {
    this.isLoading$.next(true);
    this.orderservice.fetchOrders().subscribe((orders) => {
      this.orders$.next(orders);
    });
    this.orderservice.fetchRealTimeOrders().subscribe((orders) => {
      this.isLoading$.next(true);
      console.log('fetched order from signal R:', orders[0]);
      this.orders$.next([...this.orders$.value, orders[0]]);
    });
  }
}
