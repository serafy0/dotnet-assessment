import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './components/stock/stock.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StockService } from './services/stock.service';
import { StockDataSource } from './services/stock.dataSource';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './services/order.service';
import { OrderDataSource } from './services/order.dataSoruce';
import { OrderForm } from './components/order-form/order-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/chart/chart.component';
@NgModule({
  declarations: [StockComponent, OrderComponent, OrderForm, ChartComponent],
  exports: [StockComponent, OrderComponent],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgChartsModule,
  ],
  providers: [StockService, StockDataSource, OrderService, OrderDataSource],
})
export class StocksModule {}
