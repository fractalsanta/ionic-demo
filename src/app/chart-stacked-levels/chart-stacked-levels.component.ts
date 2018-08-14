import { Component, OnInit, Input } from '@angular/core';
import { ProvincialDamLevel } from '../data.model';
import * as moment from '../../../node_modules/moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-chart-stacked-levels',
  templateUrl: './chart-stacked-levels.component.html'
})
export class ChartStackedLevelsComponent implements OnInit {
  @Input()
  set province(province: ProvincialDamLevel) {
    this.selectedProvince = province;
    this.chartData = {
      full: this.selectedProvince.levels.map(measure => measure.measurement),
      empty: this.selectedProvince.levels.map(measure => _.round(100 - measure.measurement, 2)),
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
    console.log(item);
    if ((item.series.name = 'Percentage full')) {
      this.selectedDate = { date: item.category, level: item.value, province: this.selectedProvince.province, reverse: false };
    } else {
      this.selectedDate = { date: item.category, level: item.value, province: this.selectedProvince.province, reverse: true };
    }
  }

  showChart() {
    this.selectedDate = null;
  }
}
