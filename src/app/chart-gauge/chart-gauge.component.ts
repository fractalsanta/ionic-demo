import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-gauge',
  templateUrl: './chart-gauge.component.html'
})
export class ChartGaugeComponent implements OnInit {
  @Input() gaugeData: any;
  @Output() clearGauge = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onClearGauge() {
    this.clearGauge.emit();
  }
}
