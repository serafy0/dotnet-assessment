import { Component, OnInit } from '@angular/core';
import { StockDataSource } from '../../services/stock.dataSource';
import { StockService } from '../../services/stock.service';
import { IPrices } from '../../types/IStock';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
})
export class StockComponent implements OnInit {
  title = 'stocks';

  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource = new StockDataSource(this.stockService);
  constructor(private stockService: StockService) {}

  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44],
      label: 'g',
    },
  ];

  chartId: number = 1;
  chartData!: ChartConfiguration['data'];
  onClick(id: number) {
    (window as any).scrollTo(0, document.body.scrollHeight);

    this.chartId = id;
    console.log(this.chartId);
    this.stockService.fetchOneStock(this.chartId).subscribe((stock) => {
      const priceValues = [];
      const pricesDates = [];
      for (let price of stock.prices!) {
        priceValues.push(price.value);
        var newDate = new Date(price.createdAt);
        pricesDates.push(newDate.toLocaleString('en-US'));
      }
      this.chartData = {
        datasets: [
          {
            data: priceValues,
            label: 'stock',
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          },
        ],
        labels: pricesDates,
      };
    });
  }

  ngOnInit(): void {
    this.dataSource.loadStocks();
  }
}
