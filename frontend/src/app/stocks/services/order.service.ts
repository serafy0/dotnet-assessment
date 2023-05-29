import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../types/IOrder';
import { Injectable } from '@angular/core';
import { SignalrService } from './signal-r.service';

@Injectable()
export class OrderService {
  constructor(
    private http: HttpClient,
    private singalService: SignalrService
  ) {}

  fetchOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('https://localhost:7288/api/order');
  }

  fetchRealTimeOrders(): Observable<IOrder[]> {
    return this.singalService.signalRObservable(
      'https://localhost:7288/orderHub',
      'SendOrder'
    );
  }
}
