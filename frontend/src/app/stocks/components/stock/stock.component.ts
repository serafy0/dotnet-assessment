import { Component, OnInit } from '@angular/core';
import { StockDataSource } from '../../services/stock.dataSource';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
})
export class StockComponent implements OnInit {
  title = 'stocks';

  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource = new StockDataSource(this.stockService);
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.dataSource.loadStocks();
  }
}
