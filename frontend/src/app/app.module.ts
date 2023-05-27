import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksModule } from './stocks/stocks.module';
import { StockComponent } from './stocks/components/stock/stock.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StocksModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
