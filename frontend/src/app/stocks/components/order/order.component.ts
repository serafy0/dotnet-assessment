import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDataSource } from '../../services/order.dataSoruce';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  title = 'orders';
  displayedColumns: string[] = [
    'id',
    'stockName',
    'price',
    'buyer',
    'quantity',
  ];
  dataSource = new OrderDataSource(this.orderService);
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.dataSource.loadorders();
  }
}
