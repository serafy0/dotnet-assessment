import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockDataSource } from '../../services/stock.dataSource';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
})
export class OrderForm implements OnInit {
  stocksSource = new StockDataSource(this.stockService);

  orderForm: FormGroup = new FormGroup({
    stockID: new FormControl('', [Validators.required]),
    price: new FormControl(1, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    quantity: new FormControl(1, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    buyer: new FormControl('', [Validators.required]),
  });

  constructor(
    private orderService: OrderService,
    private stockService: StockService
  ) {}
  onSubmit() {
    const newOrder = this.orderForm.value;

    if (this.orderForm.valid) {
      this.orderService.createOrder(newOrder);

      this.orderForm.reset();
    }
  }
  ngOnInit(): void {
    this.stocksSource.fetchStocksFromAPI();
  }
}
