import { Injectable } from '@angular/core';
import { IStock } from '../types/IStock';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockService } from './stock.service';

@Injectable()
export class StockDataSource extends DataSource<IStock> {
  stocks$ = new BehaviorSubject<IStock[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private stockService: StockService) {
    super();
  }

  connect(): Observable<IStock[]> {
    return this.stocks$.asObservable();
  }
  disconnect(): void {
    this.stocks$.complete();
  }
  loadStocks(): void {
    this.isLoading$.next(true);
    this.stockService.fetchStocks().subscribe((stocks) => {
      this.stocks$.next(stocks.sort((a, b) => (a.id < b.id ? 1 : 0)));
    });
    this.stockService.fetchRealTimeStocks().subscribe((stocks) => {
      this.isLoading$.next(true);
      console.log('signalStocks: ', stocks);
      this.stocks$.next(stocks[0].sort((a, b) => (a.id < b.id ? 1 : 0)));
    });
  }
}
