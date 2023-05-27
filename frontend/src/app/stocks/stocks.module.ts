import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './components/stock/stock.component';
import { MatTableModule } from '@angular/material/table';
import { StockService } from './services/stock.service';
import { StockDataSource } from './services/stock.dataSource';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [StockComponent],
  exports: [StockComponent],
  imports: [CommonModule, MatTableModule, HttpClientModule],
  providers: [StockService, StockDataSource],
})
export class StocksModule {}
