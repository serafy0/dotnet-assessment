import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

@Component({
  selector: 'stock-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  title = 'stocks';
  public lineChartType: ChartType = 'line';
  @Input()
  chartData: any = {};
}
