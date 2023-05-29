import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './stocks/components/order/order.component';
import { StockComponent } from './stocks/components/stock/stock.component';

const routes: Routes = [
  { path: 'orders', component: OrderComponent },
  { path: 'stocks', component: StockComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
