import { Component, OnInit, Input } from '@angular/core';
import { ProvincialDamLevel } from '../data.model';
import * as moment from '../../../node_modules/moment';

@Component({
  selector: 'app-chart-line-levels',
  templateUrl: './chart-line-levels.component.html'
})
export class ChartLineLevelsComponent implements OnInit {
  @Input()
  set province(province: ProvincialDamLevel) {
    this.selectedProvince = province;
    this.chartData = {
      data: this.selectedProvince.levels.map(measure => measure.measurement),
      labels: this.selectedProvince.levels.map(label => moment(label.date).format('DD MMM YYYY'))
    };
    this.selectedDate = null;
  }

  selectedProvince: ProvincialDamLevel;
  selectedDate: any;
  chartData: any;

  constructor() {}

  ngOnInit() {}

  clicked(item) {
    this.selectedDate = { date: item.category, level: item.value, province: this.selectedProvince.province, reverse: false };
  }

  showChart() {
    this.selectedDate = null;
  }
}
