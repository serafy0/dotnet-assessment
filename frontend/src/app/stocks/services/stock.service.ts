import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStock } from '../types/IStock';
import { Injectable } from '@angular/core';
import { SignalrService } from './signal-r.service';

@Injectable()
export class StockService {
  constructor(
    private http: HttpClient,
    private singalService: SignalrService
  ) {}

  fetchStocks(): Observable<IStock[]> {
    return this.http.get<IStock[]>('https://localhost:7288/api/stock');
    // return this.http.get<IStock[]>('http://localhost:5284/api/stock');
  }

  fetchRealTimeStocks(): Observable<IStock[][]> {
    return this.singalService.signalRObservable(
      'https://localhost:7288/stockHub',
      'PriceUpdates'
    );
  }
}
